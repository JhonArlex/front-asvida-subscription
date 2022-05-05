import {NgModule} from '@angular/core';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { NgxLoadingService } from 'ngx-loading';
import { ApolloLink } from 'apollo-link';
import { AuthService } from './core/services/auth.service';
import { onError } from 'apollo-link-error';
import { switchMap } from 'rxjs';

const uri = environment.graphqlUri; // <-- add the URL of the GraphQL server here
@NgModule({

})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private loadingService: NgxLoadingService,
    private authService: AuthService
  ) {

    const linkHttp: any = httpLink.create({ uri });

    const authLink = new ApolloLink((operation, forward) => {
      const user = this.authService.user;
      if (user) {
        if (operation.operationName !== 'login' && operation.operationName !== 'refresh_token') {
          operation.setContext({
            headers: {
              'Authorization': `Bearer ${user.access_token}`
            }
          });
        }
      }

      // Call the next link in the middleware chain.
      return forward(operation);
    });

    const errorLink: any = onError(({ forward, graphQLErrors, networkError, operation }): any => {
      if (graphQLErrors) {
        console.log('[Network error]:', networkError);
        if (graphQLErrors[0].message.includes("Unauthorized") && operation.operationName !== 'refresh_token') {
          return authService.refreshToken()!
            .pipe(
              switchMap(async () => forward(operation))
            );
        } else {
          authService.logout();
        }
      }
    });

    const httpLinkWithMiddleware = errorLink.concat(authLink.concat(linkHttp));

    apollo.create({
      link: httpLinkWithMiddleware,
      cache: new InMemoryCache()
  });
  }
}

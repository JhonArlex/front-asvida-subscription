import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CardBarChartComponent } from "./cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./cards/card-stats/card-stats.component";
import { CardTableComponent } from "./cards/card-table/card-table.component";
import { IndexDropdownComponent } from "./dropdowns/index-dropdown/index-dropdown.component";
import { NotificationDropdownComponent } from "./dropdowns/notification-dropdown/notification-dropdown.component";
import { PagesDropdownComponent } from "./dropdowns/pages-dropdown/pages-dropdown.component";
import { TableDropdownComponent } from "./dropdowns/table-dropdown/table-dropdown.component";
import { UserDropdownComponent } from "./dropdowns/user-dropdown/user-dropdown.component";
import { FooterAdminComponent } from "./footers/footer-admin/footer-admin.component";
import { FooterSmallComponent } from "./footers/footer-small/footer-small.component";
import { FooterComponent } from "./footers/footer/footer.component";
import { HeaderStatsComponent } from "./headers/header-stats/header-stats.component";
import { MapExampleComponent } from "./maps/map-example/map-example.component";
import { AdminNavbarComponent } from "./navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./navbars/auth-navbar/auth-navbar.component";
import { IndexNavbarComponent } from "./navbars/index-navbar/index-navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { SubscriptionItemComponent } from "./subscription-item/subscription-item.component";

const components = [
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    SubscriptionItemComponent
]

@NgModule({
    declarations: [
       ...components, 
    ],
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        ...components
    ]
  })
  export class ComponentsModule { }
  
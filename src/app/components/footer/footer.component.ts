import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  copyRight = ['Terms of Use', 'Privacy Policy', 'Interest-Based Ads', 'EU Privacy Rights', 'Cookie Policy', 'License Agreement', 'Manage Privacy Preferences', '©2023 Marvel']
}

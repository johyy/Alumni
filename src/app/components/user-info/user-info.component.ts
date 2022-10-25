import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router} from '@angular/router';
import { StorageUtil } from 'src/app/utils/storage.util';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  @Input() user: User = Object();
  currentUser: User = Object();

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.currentUser = StorageUtil.storageReadOne(StorageKeys.User)!;;
  }

  isCurrentUser(): Boolean {
    if (this.user.id == this.currentUser.id) {
      return true;
    } else {
      return false
    }
  }

  navigateToEditUser() {
    this.router.navigateByUrl(`/profile/edit`);
  }
}

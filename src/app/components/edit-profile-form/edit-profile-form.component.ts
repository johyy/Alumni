import { Component, OnInit, Input } from '@angular/core';
import { Router} from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {
  public userInEdit: User | null = null;

  get user(): User {
    return this.userService.user;
  }

  constructor(private location: Location, public router: Router, private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.findProfile();
    this.userInEdit = this.user
  }

  cancel(): void {
    this.location.back()
  }

  editProfile(editProfileForm: NgForm): void {
      if(this.userInEdit != null){
        const {name, avatar,status_message,bio,fun_fact} = editProfileForm.value;
        const editedProfile = this.userInEdit;
        editedProfile.name=name;
        editedProfile.avatar = avatar;
        editedProfile.status_message = status_message;
        editedProfile.bio = bio;
        editedProfile.fun_fact= fun_fact;
        this.userService.editUser(this.userInEdit.id,editedProfile).subscribe(
          ()=> this.router.navigate(['profile'])
        )
      }

    }   
  }



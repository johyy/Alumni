import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public profileInEdit: User | null = null;

  constructor(private location: Location, public router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.location.back()
  }

  editProfile(editProfileForm: NgForm): void {
      const {avatar,status_message,bio,fun_fact} = editProfileForm.value;
      const editedProfile = this.profileInEdit;
      editedProfile.avatar = avatar;
      editedProfile.status_message = status_message;
      editedProfile.bio = bio;
      editedProfile.fun_fact= fun_fact;
      // Call editPost and navigate to post/{post_id}
      this.userService.editProfile(this.userInEdit.id,editedProfile).subscribe(
        ()=> this.router.navigate(['user',editedProfile.id])
      )
    }   
  }

  

}

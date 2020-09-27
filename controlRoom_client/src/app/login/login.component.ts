import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { Message, MessageService } from '../shared/components/index';
import { LogginService, UserService, LabelService, StructureService, ScreenService } from '../shared/services/index';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', './SeasonalThemes/halloween.scss', './SeasonalThemes/christmas.scss', './SeasonalThemes/summer.scss'],
    animations: [routerTransition()],
    providers: [MessageService, StructureService, ScreenService]
})
export class LoginComponent implements OnInit {


	authentification : any = {};
	mess: string = '';

	userInfoGathered: boolean = false;
	environmentGathered: boolean = false;
	parameterGathered: boolean = false;
	labelsGathered: boolean = false;

    canConnect: boolean = false;
	connectionMessage: Message [] = [];

    constructor(public router: Router, private _logginService: LogginService, 
                private _userService: UserService,
                private _labelService: LabelService, 
                private _messageService: MessageService,
                private _screenService: ScreenService,
                private _structureService: StructureService) { 
        this.canConnect = false;
        this.authentification.username = '';
        this._messageService.add({severity:'success', summary: 'Success Message', detail:'Order submitted'});
    
    }

    ngOnInit() {}

    onLoggedin() {
        //localStorage.setItem('isLoggedin', 'true');
   		this._logginService.login(this.authentification.username, this.authentification.password) 
            .subscribe( result => {
                 this.canConnect = result;
				 if (this.canConnect) {
                    this.fetchUserConfiguration();
				}
				else {
					this.showInvalidCredential();
				}
			}
        );
    }
    showInvalidCredential() {
		this.connectionMessage = [];
        this.connectionMessage.push({severity:'error', summary:'Invalid credentials', detail:'Use your GOLD user/password'});
	}

    async fetchUserConfiguration() {
        /**
		 * 1. Load User information to enable menu access and functionnality
		 * 2. Get the corporate environments user can have access
		 * 3. Get Profile and Menu access
		 */

        console.log('LOGIN : Fectching user configuration');

        this.parameterGathered = true;
        this.labelsGathered = true;
        await this._userService.getInfo(localStorage.getItem('ICRUser'))
            .subscribe( result => { this.userInfoGathered = true; });        

        await this._userService.getEnvironment(localStorage.getItem('ICRUser'))       
            .subscribe( result => { 
                console.log('Environment data gathered');
                this.environmentGathered = true;
                localStorage.setItem('isLoggedin', 'true');
                this.router.navigate(['/dashboard']);
                this._structureService.getStructure();
                this._structureService.getNetwork();
            });
        

	      /*    this._userService.getEnvironment(localStorage.getItem('ICRUser')).pipe(
                mergeMap( result => { this.environmentGathered = true; return [true];}));*/
		//this._labelService.getAllLabels().subscribe( result => { this.labelsGathered = true; });

        
       /*new Promise  ((resolve, reject) => {
        let user = this._userService.getInfo(localStorage.getItem('ICRUser')).subscribe( result =>  {
          resolve(user);
          this.userInfoGathered = true;
            });
        });
       new Promise  ((resolve, reject) => {
        let env = this._userService.getEnvironment(localStorage.getItem('ICRUser')).subscribe( result =>  {
          resolve(env);
          this.environmentGathered = true;
            });
        });
		
       new Promise((resolve, reject) => {
        let labels = this._labelService.getAllLabels().subscribe(result => {
          resolve(labels);
          this.labelsGathered = true;
            });
        });*/

        //this._userService.getInfo(localStorage.getItem('ICRUser')).subscribe( result => { this.userInfoGathered = true; });
		//this._userService.getEnvironment(localStorage.getItem('ICRUser')).subscribe( result => { this.environmentGathered = true; });
    }
}
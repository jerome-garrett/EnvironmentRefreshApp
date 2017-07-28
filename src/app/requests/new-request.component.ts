import { RefreshRequestService } from './refresh-request.service';
import { ConfigService } from './../config/config.service';
import { EnvironmentService } from './../environment/environment.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from './../environment/environment';

@Component({
  selector: 'app-newrequest',
  templateUrl: './new-request.component.html'
})
export class NewRequestComponent implements OnInit {

environments: any[] = [];
databases = [
  { label: 'Clients', value: 'Clients' },
  { label: 'Customers', value: 'Customers' },
  { label: 'Orders', value: 'Orders' }
];

newRequest = {
  environment: '',
  databaseNames: []
}

  constructor(private environmentService: EnvironmentService, 
              private router: Router,
              private requestService: RefreshRequestService) { }

  ngOnInit() {
    var env;
    this.environmentService.getEnvironments().then(envs => {
      for( var i=0; i< envs.length; i++)
      {
        this.environments.push( { label: envs[i].environment, value: envs[i].environment });
      }
    })
  }

  onDbToggle(envName, $event) {
    if($event.target.checked) {
      this.newRequest.databaseNames.push(envName);
    }
    else {
      var index = this.newRequest.databaseNames.indexOf(envName);
      this.newRequest.databaseNames.splice(index,1);
    }
  }

  onSubmit() {
    this.requestService.addRequest(this.newRequest)
      .then( () => this.router.navigate(['/requests']))
      .catch(err => alert(err));
  }
  
}

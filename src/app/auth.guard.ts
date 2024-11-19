import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './service/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    const userRole = authService.getRole();
    const allowedRoles = _route.data['roles'] as Array<string>;
    let roleFound=false;
    let customerRole=false;
    allowedRoles.forEach(role=>{
      if (role && role.indexOf(userRole) != -1) {
        roleFound= true;
      }
      if(role==="Customer"){
        customerRole=true;
      }
    });
    if(roleFound){
      return true;
    }else if(customerRole){
      router.navigate(['/signin']);
      return false;
    }else{
      router.navigate(['/admin/login']);
      return false;
    }
    
  }else if(_route.data['roles'][0]=="Customer"){
    router.navigate(['/signin']);
    return false;
  }

  router.navigate(['/admin/login']);
  return false;
};

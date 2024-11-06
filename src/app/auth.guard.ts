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
    allowedRoles.forEach(role=>{
      if (role && role.indexOf(userRole) != -1) {
        roleFound= true;
      }
    });
    if(roleFound){
      return true;
    }else{
      router.navigate(['/admin/login']);
      return false;
    }
    
  }

  router.navigate(['/admin/login']);
  return false;
};

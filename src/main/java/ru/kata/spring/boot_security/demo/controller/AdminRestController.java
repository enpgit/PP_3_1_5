package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminRestController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminRestController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //All users REST
    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getAllUsersRest() {
        List<User> response = userService.getAllUsers();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //All roles REST
    @GetMapping("/api/roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    //Auth user
    @GetMapping("/api/auth")
    public ResponseEntity<User> showAuthUser(Principal principal) {
        User response = userService.getUserByUsername(principal.getName());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //View user REST
    @GetMapping("/api/users/{id}")
    public ResponseEntity<User> getUserRest(@PathVariable("id") Long id) {
        User response = userService.getUserById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Add users REST
    @PostMapping("/api/users")
    public ResponseEntity<HttpStatus> saveUserRest(@RequestBody User user) {
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //Edit user REST
    @PatchMapping("/api/users")
    public ResponseEntity<HttpStatus> updateUserRest(@RequestBody User user) {
        userService.editUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Delete user REST
    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<HttpStatus> deleteUserRest(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
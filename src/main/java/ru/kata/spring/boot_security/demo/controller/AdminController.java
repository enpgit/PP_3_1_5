package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    //All users REST
    @GetMapping("/api/users")
    public List<User> getAllUsersRest(ModelMap model, @ModelAttribute("user") User user
            , Principal principal) {
        User authenticatedUser = userService.getUserByUsername(principal.getName());
        model.addAttribute("authenticatedUser", authenticatedUser);
        model.addAttribute("authenticatedUserRoles", authenticatedUser.getRoles());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleService.getAllRoles());
        List<User> users = userService.getAllUsers();
        return users;
    }

    //Add users REST
    @PostMapping("/api/users")
    public String saveUserRest(@RequestBody User user) {
        userService.saveUser(user);
        return "Пользователь добавлен ";
    }

    //Edit user REST
    @PatchMapping("/api/users")
    public String updateUserRest(@RequestBody User user) {
        userService.editUser(user);
        return "Пользователь изменен ";
    }

    // Delete user REST
    @DeleteMapping("/api/users/{id}")
    public String deleteUserRest(@PathVariable("id") Long id, Principal principal) {
        boolean checkDeletingActivedUser = userService.getUserByUsername(principal.getName()).equals(userService.getUserById(id));
        userService.deleteUser(id);
        if (checkDeletingActivedUser) {
            return "redirect:/process_login";
        } else {
            return "redirect:/admin";
        }

    }
}
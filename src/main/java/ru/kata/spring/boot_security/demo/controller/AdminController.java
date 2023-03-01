package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public String getAllUsers(ModelMap model, @ModelAttribute("user") User user
            , Principal principal) {
        User authenticatedUser = userService.getUserByUsername(principal.getName());
        model.addAttribute("authenticatedUser", authenticatedUser);
        model.addAttribute("authenticatedUserRoles", authenticatedUser.getRoles());
        model.addAttribute("users", userService.getAllUsers());
        model.addAttribute("roles", roleService.getAllRoles());
        return "admin-page";
    }


    // ADD USER
    @PostMapping
    public String saveUser(@ModelAttribute("user") User newUser) {
        userService.saveUser(newUser);
        return "redirect:/admin";
    }

    // EDIT USER
    @PatchMapping("/edit/{id}")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.editUser(user);
        return "redirect:/admin";
    }

    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id, Principal principal) {
        boolean checkDeletingActivedUser = userService.getUserByUsername(principal.getName()).equals(userService.getUserById(id));

        if (checkDeletingActivedUser) {
            userService.deleteUser(id);
            return "redirect:/process_login";
        } else {
            return "redirect:/admin";
        }

    }
}
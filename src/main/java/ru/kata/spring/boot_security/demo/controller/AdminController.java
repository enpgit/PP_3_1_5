package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }



    @GetMapping
    public String getAllUsers(ModelMap model) {
        model.addAttribute("allUser", userService.getAllUsers());
        return "view-users";
    }

    @GetMapping(value = "/add_user")
    public String addUser(ModelMap model) {
        model.addAttribute("user", new User());
        model.addAttribute("add", true);
        //List<Role> roles = (List<Role>)
        return "add_edit";
    }

    @PostMapping
    public String saveUser(@ModelAttribute("user") User user, ModelMap model) {
        userService.saveUser(user);
        model.addAttribute("add", true);
        return "redirect:/admin";
    }

    @GetMapping(value = "/edit_user/{id}")
    public String editUser(ModelMap model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUserById(id));
        model.addAttribute("add", false);
        return "add_edit";
    }

    @PatchMapping("/edit_user/{id}")
    public String updateUser(@ModelAttribute("user") User user, ModelMap model) {
        userService.editUser(user);
        model.addAttribute("add", false);
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
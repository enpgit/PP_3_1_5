package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public String getAllUsers(ModelMap model) {
        model.addAttribute("allUser", userService.getAllUsers());
        return "all-users";
    }

    @GetMapping(value = "/add_user")
    public String addUser(ModelMap model) {
        model.addAttribute("user", new User());
        model.addAttribute("add", true);
        return "user-info";
    }

    @PostMapping
    public String saveUser(@ModelAttribute("user") User user, ModelMap model) {
        userService.saveUser(user);
        model.addAttribute("add", true);
        return "redirect:/users";
    }

    @GetMapping(value = "/edit_user/{id}")
    public String editUser(ModelMap model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUser(id));
        model.addAttribute("add", false);
        return "user-info";
    }

    @PatchMapping("/edit_user/{id}")
    public String updateUser(@ModelAttribute("user") User user, ModelMap model) {
        userService.updateUser(user);
        model.addAttribute("add", false);
        return "redirect:/users";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/users";
    }
}
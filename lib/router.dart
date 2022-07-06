import 'package:amazon_clone/features/auth/screens/auth_screen.dart';
import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

//Genrateroute is function and route setting give us any data which is helpfull for constructing the routes
Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    //create a static variable at authscreen
    case AuthScreen.routeName:
      return MaterialPageRoute(
        settings: routeSettings,
        builder: (_) => const AuthScreen(),
      );
    default:
      return MaterialPageRoute(
        settings: routeSettings,
        // for genrating costom error
        builder: (_) => Scaffold(
          body: Center(child: "Error 404!".text.make()),
        ),
      );
  }
}

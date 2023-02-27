import 'dart:convert';

import 'package:amazon_clone/constants/utils.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import '../../../constants/error_handling.dart';
import '../../../constants/global_variables.dart';
import '../../../models/user.dart';
import '../../../providers/user_provider.dart';

class AddresServices {
  void saveUserAddress({
    required BuildContext context,
    required String address,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/save-user-address'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
        body: jsonEncode({
          'address': address,
        }),
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          User user = userProvider.user.copyWith(
            address: jsonDecode(res.body)['address'],
          );

          userProvider.setUserWithModel(user);
        },
      );
    } catch (e) {
      showSnakeBar(context, e.toString());
    }
  }
  
   void placeOrder({
    required BuildContext context,
    required String address,
    required double totalPrice,
   
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/order'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
        body: jsonEncode({
          'cart': userProvider.user.cart,
          'totalPrice': totalPrice,
          'address': address,
        }),
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          User user = userProvider.user.copyWith(
            cart: [],
          );
          userProvider.setUserWithModel(user);
          showSnakeBar(context, "Your order has been placed!");
        },
      );
    } catch (e) {
      showSnakeBar(context, e.toString());
    }
  }

}

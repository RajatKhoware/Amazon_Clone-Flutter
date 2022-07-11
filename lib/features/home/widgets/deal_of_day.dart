import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

class DealOfTheDay extends StatefulWidget {
  const DealOfTheDay({Key? key}) : super(key: key);

  @override
  State<DealOfTheDay> createState() => _DealOfTheDayState();
}

class _DealOfTheDayState extends State<DealOfTheDay> {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          Container(
            alignment: Alignment.topLeft,
            child: "Deal of the day"
                .text
                .size(20)
                .fontWeight(FontWeight.w500)
                .make()
                .px12(),
          ),
          const SizedBox(
            height: 5,
          ),
          Image.network(
            'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fHByb2R1Y3RzJTIwYXBwbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
            height: 235,
            fit: BoxFit.fitHeight,
          ),
          const SizedBox(height: 5),
          Container(
            padding: const EdgeInsets.only(left: 15),
            alignment: Alignment.topLeft,
            child: const Text(
              "\$${999}",
              style: TextStyle(fontSize: 18),
            ),
          ),
          Container(
            padding: const EdgeInsets.only(left: 15, right: 40, top: 5),
            alignment: Alignment.topLeft,
            child: const Text(
              "Sírjátok vágy pénzt ti emberek csecsemő kerék fehérül, el csecsemő.",
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(fontSize: 18),
            ),
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Image.network(
                  "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
                  fit: BoxFit.fitWidth,
                  width: 100,
                  height: 100,
                ),
                Image.network(
                  "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
                  fit: BoxFit.fitWidth,
                  width: 100,
                  height: 100,
                ),
                Image.network(
                  "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
                  fit: BoxFit.fitWidth,
                  width: 100,
                  height: 100,
                ),
                Image.network(
                  "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
                  fit: BoxFit.fitWidth,
                  width: 100,
                  height: 100,
                ),
                Image.network(
                  "https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80s",
                  fit: BoxFit.fitWidth,
                  width: 100,
                  height: 100,
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.only(left: 15, right: 15, top: 15),
            alignment: Alignment.topLeft,
            child: const Text(
              "See all deals",
              overflow: TextOverflow.ellipsis,
              style: TextStyle(color: Color.fromARGB(255, 0, 153, 173)),
            ),
          ),
        ],
      ),
    );
  }
}

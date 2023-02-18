import 'package:amazon_clone/constants/loader.dart';
import 'package:amazon_clone/features/home/service/home_services.dart';
import 'package:amazon_clone/features/product_details.dart/screen/product_details.dart';
import 'package:amazon_clone/models/products.dart';
import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

class DealOfTheDay extends StatefulWidget {
  const DealOfTheDay({Key? key}) : super(key: key);

  @override
  State<DealOfTheDay> createState() => _DealOfTheDayState();
}

class _DealOfTheDayState extends State<DealOfTheDay> {
  HomeServices homeServices = HomeServices();
  Product? product;
  @override
  void initState() {
    super.initState();
    fetchDealOfDay();
  }

  void fetchDealOfDay() async {
    product = await homeServices.fetchDealsOfDay(context: context);
    setState(() {});
  }

  void navigateToProductDetails() {
    Navigator.pushNamed(context, ProductDetailScreen.routeName,
        arguments: product);
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: product == null
          ? const Loader()
          : product!.name.isEmpty
              ? const SizedBox()
              : Column(
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
                    InkWell(
                      onTap: () => navigateToProductDetails(),
                      child: Image.network(
                        product!.images[0],
                        height: 235,
                        fit: BoxFit.fitHeight,
                      ),
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
                      padding:
                          const EdgeInsets.only(left: 15, right: 40, top: 5),
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
                      child: InkWell(
                        onTap: () => navigateToProductDetails(),
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: product!.images
                                .map(
                                  (e) => Image.network(
                                    e,
                                    fit: BoxFit.fitWidth,
                                    width: 100,
                                    height: 100,
                                  ),
                                )
                                .toList()),
                      ),
                    ),
                    Container(
                      padding:
                          const EdgeInsets.only(left: 15, right: 15, top: 15),
                      alignment: Alignment.topLeft,
                      child: const Text(
                        "See all deals",
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          color: Color.fromARGB(255, 0, 153, 173),
                        ),
                      ),
                    ),
                  ],
                ),
    );
  }
}

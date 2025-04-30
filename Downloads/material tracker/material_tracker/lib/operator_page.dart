import 'package:flutter/material.dart';
import 'material_model.dart';

class OperatorPage extends StatefulWidget {
  @override
  State<OperatorPage> createState() => _OperatorPageState();
}

class _OperatorPageState extends State<OperatorPage> {
  int selectedIndex = 0;
  final quantityController = TextEditingController();
  final processingCostController = TextEditingController();
  final marginController = TextEditingController();

  String result = '';

  void calculate() {
    final selected = materials[selectedIndex];
    final qty = int.tryParse(quantityController.text) ?? 0;
    final procCost = double.tryParse(processingCostController.text) ?? 0;
    final margin = double.tryParse(marginController.text) ?? 0;

    if (qty > selected.stock) {
      setState(() => result = 'Not enough stock!');
      return;
    }

    double rawCost = qty * selected.unitCost;
    double mfgCost = rawCost + procCost;
    double finalPrice = mfgCost + margin;

    setState(() {
      selected.stock -= qty;
      result = 'Raw Cost: ₹${rawCost.toStringAsFixed(2)}\n'
               'Mfg Cost: ₹${mfgCost.toStringAsFixed(2)}\n'
               'Selling Price: ₹${finalPrice.toStringAsFixed(2)}\n'
               'Remaining Stock: ${selected.stock}';
    });
  }

  @override
  Widget build(BuildContext context) {
    if (materials.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: Text('Operator Panel')),
        body: Center(child: Text('No materials available.')),
      );
    }

    return Scaffold(
      appBar: AppBar(title: Text('Operator Panel')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            DropdownButton<int>(
              value: selectedIndex,
              items: List.generate(materials.length, (i) {
                return DropdownMenuItem(value: i, child: Text(materials[i].name));
              }),
              onChanged: (i) => setState(() => selectedIndex = i!),
            ),
            TextField(controller: quantityController, decoration: InputDecoration(labelText: 'Quantity Used')),
            TextField(controller: processingCostController, decoration: InputDecoration(labelText: 'Processing Cost')),
            TextField(controller: marginController, decoration: InputDecoration(labelText: 'Desired Margin')),
            ElevatedButton(onPressed: calculate, child: Text('Calculate')),
            SizedBox(height: 16),
            Text(result),
          ],
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'material_model.dart';

class AdminPage extends StatefulWidget {
  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController costController = TextEditingController();
  final TextEditingController stockController = TextEditingController();

  void addMaterial() {
    setState(() {
      materials.add(MaterialItem(
        name: nameController.text,
        unitCost: double.tryParse(costController.text) ?? 0,
        stock: int.tryParse(stockController.text) ?? 0,
      ));
    });
    nameController.clear();
    costController.clear();
    stockController.clear();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Admin Panel')),
      body: Column(
        children: [
          TextField(controller: nameController, decoration: InputDecoration(labelText: 'Material Name')),
          TextField(controller: costController, decoration: InputDecoration(labelText: 'Unit Cost')),
          TextField(controller: stockController, decoration: InputDecoration(labelText: 'Stock Quantity')),
          ElevatedButton(onPressed: addMaterial, child: Text('Add Material')),
          Expanded(
            child: ListView.builder(
              itemCount: materials.length,
              itemBuilder: (_, i) {
                final m = materials[i];
                return ListTile(
                  title: Text('${m.name} - ₹${m.unitCost} x ${m.stock}'),
                );
              },
            ),
          )
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'material_model.dart';

class AdminPage extends StatefulWidget {
  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  final nameController = TextEditingController();
  final costController = TextEditingController();
  final stockController = TextEditingController();

  void addOrUpdateMaterial({int? index}) {
    final name = nameController.text;
    final unitCost = double.tryParse(costController.text) ?? 0;
    final stock = int.tryParse(stockController.text) ?? 0;

    setState(() {
      if (index == null) {
        materials.add(MaterialItem(name: name, unitCost: unitCost, stock: stock));
      } else {
        materials[index] = MaterialItem(name: name, unitCost: unitCost, stock: stock);
      }
    });

    nameController.clear();
    costController.clear();
    stockController.clear();
  }

  void deleteMaterial(int index) {
    setState(() {
      materials.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Admin Dashboard')),
      body: Padding(
        padding: EdgeInsets.all(12),
        child: Column(
          children: [
            TextField(controller: nameController, decoration: InputDecoration(labelText: 'Material Name')),
            TextField(controller: costController, decoration: InputDecoration(labelText: 'Unit Cost')),
            TextField(controller: stockController, decoration: InputDecoration(labelText: 'Stock Quantity')),
            SizedBox(height: 10),
            ElevatedButton(onPressed: () => addOrUpdateMaterial(), child: Text('Add Material')),
            Divider(),
            Expanded(
              child: ListView.builder(
                itemCount: materials.length,
                itemBuilder: (_, i) {
                  final m = materials[i];
                  return ListTile(
                    title: Text('${m.name} - ₹${m.unitCost} x ${m.stock}'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: Icon(Icons.edit),
                          onPressed: () {
                            nameController.text = m.name;
                            costController.text = m.unitCost.toString();
                            stockController.text = m.stock.toString();
                            addOrUpdateMaterial(index: i);
                          },
                        ),
                        IconButton(
                          icon: Icon(Icons.delete),
                          onPressed: () => deleteMaterial(i),
                        ),
                      ],
                    ),
                  );
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}

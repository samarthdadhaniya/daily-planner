import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: const FirebaseOptions(
      apiKey: "YOUR-API-KEY", // Replace with your Firebase API key
      authDomain: "YOUR-AUTH-DOMAIN",
      projectId: "YOUR-PROJECT-ID",
      storageBucket: "YOUR-STORAGE-BUCKET",
      messagingSenderId: "YOUR-SENDER-ID",
      appId: "YOUR-APP-ID"
    ),
  );
  runApp(MaterialApp(
    home: MaterialListScreen(),
  ));
}

class MaterialModel {
  String id;
  String name;
  double unitCost;
  int stock;

  MaterialModel({required this.id, required this.name, required this.unitCost, required this.stock});

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'unitCost': unitCost,
      'stock': stock,
    };
  }

  factory MaterialModel.fromMap(String id, Map<String, dynamic> map) {
    return MaterialModel(
      id: id,
      name: map['name'],
      unitCost: map['unitCost'],
      stock: map['stock'],
    );
  }
}

class MaterialListScreen extends StatefulWidget {
  @override
  _MaterialListScreenState createState() => _MaterialListScreenState();
}

class _MaterialListScreenState extends State<MaterialListScreen> {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController costController = TextEditingController();
  final TextEditingController stockController = TextEditingController();

  void addMaterial() {
    final String name = nameController.text;
    final double unitCost = double.tryParse(costController.text) ?? 0.0;
    final int stock = int.tryParse(stockController.text) ?? 0;

    FirebaseFirestore.instance.collection('materials').add({
      'name': name,
      'unitCost': unitCost,
      'stock': stock,
    });

    nameController.clear();
    costController.clear();
    stockController.clear();
  }

  void updateStock(String id, int newStock) {
    FirebaseFirestore.instance.collection('materials').doc(id).update({'stock': newStock});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Material Tracker')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              children: [
                TextField(controller: nameController, decoration: InputDecoration(labelText: 'Material Name')),
                TextField(controller: costController, decoration: InputDecoration(labelText: 'Unit Cost'), keyboardType: TextInputType.number),
                TextField(controller: stockController, decoration: InputDecoration(labelText: 'Stock'), keyboardType: TextInputType.number),
                ElevatedButton(onPressed: addMaterial, child: Text('Add Material')),
              ],
            ),
          ),
          Expanded(
            child: StreamBuilder<QuerySnapshot>(
              stream: FirebaseFirestore.instance.collection('materials').snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) return CircularProgressIndicator();

                final docs = snapshot.data!.docs;
                return ListView.builder(
                  itemCount: docs.length,
                  itemBuilder: (context, index) {
                    final doc = docs[index];
                    final material = MaterialModel.fromMap(doc.id, doc.data() as Map<String, dynamic>);

                    return ListTile(
                      title: Text(material.name),
                      subtitle: Text('Unit Cost: ₹${material.unitCost}, Stock: ${material.stock}'),
                      trailing: IconButton(
                        icon: Icon(Icons.remove),
                        onPressed: () {
                          final newStock = material.stock - 1;
                          if (newStock >= 0) updateStock(material.id, newStock);
                        },
                      ),
                    );
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

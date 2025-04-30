import 'package:flutter/material.dart';
import 'admin_page.dart';
import 'operator_page.dart';
import 'material_model.dart';

void main() {
  runApp(MaterialApp(home: LoginPage()));
}

class LoginPage extends StatelessWidget {
  final TextEditingController roleController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login as Admin/Operator')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(controller: roleController, decoration: InputDecoration(labelText: 'Enter role')),
            ElevatedButton(
              onPressed: () {
                String role = roleController.text.trim().toLowerCase();
                if (role == 'admin') {
                  Navigator.push(context, MaterialPageRoute(builder: (_) => AdminPage()));
                } else if (role == 'operator') {
                  Navigator.push(context, MaterialPageRoute(builder: (_) => OperatorPage()));
                }
              },
              child: Text('Login'),
            )
          ],
        ),
      ),
    );
  }
}

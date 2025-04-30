import 'package:flutter/material.dart';
import '../models/material_item.dart';

class MaterialCard extends StatelessWidget {
  final MaterialItem material;
  final VoidCallback? onTap;
  final VoidCallback? onDelete;

  const MaterialCard({
    super.key,
    required this.material,
    this.onTap,
    this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text(material.name),
        subtitle: Text('${material.quantity} ${material.unit}'),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              'Added: ${material.dateAdded.toString().split(' ')[0]}',
              style: Theme.of(context).textTheme.bodySmall,
            ),
            if (onDelete != null) ...[
              const SizedBox(width: 8),
              IconButton(
                icon: const Icon(Icons.delete),
                onPressed: onDelete,
              ),
            ],
          ],
        ),
        onTap: onTap,
      ),
    );
  }
} 
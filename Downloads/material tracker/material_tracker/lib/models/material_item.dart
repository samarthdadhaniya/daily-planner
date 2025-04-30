class MaterialItem {
  final String id;
  final String name;
  final int quantity;
  final String unit;
  final DateTime dateAdded;
  final String? notes;

  MaterialItem({
    required this.id,
    required this.name,
    required this.quantity,
    required this.unit,
    required this.dateAdded,
    this.notes,
  });

  MaterialItem copyWith({
    String? id,
    String? name,
    int? quantity,
    String? unit,
    DateTime? dateAdded,
    String? notes,
  }) {
    return MaterialItem(
      id: id ?? this.id,
      name: name ?? this.name,
      quantity: quantity ?? this.quantity,
      unit: unit ?? this.unit,
      dateAdded: dateAdded ?? this.dateAdded,
      notes: notes ?? this.notes,
    );
  }
} 
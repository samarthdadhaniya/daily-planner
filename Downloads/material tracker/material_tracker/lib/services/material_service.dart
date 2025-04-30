import '../models/material_item.dart';

class MaterialService {
  final List<MaterialItem> _materials = [];

  List<MaterialItem> getMaterials() {
    return List.unmodifiable(_materials);
  }

  void addMaterial(MaterialItem material) {
    _materials.add(material);
  }

  void removeMaterial(String id) {
    _materials.removeWhere((material) => material.id == id);
  }

  void updateMaterial(MaterialItem updatedMaterial) {
    final index = _materials.indexWhere((material) => material.id == updatedMaterial.id);
    if (index != -1) {
      _materials[index] = updatedMaterial;
    }
  }
} 
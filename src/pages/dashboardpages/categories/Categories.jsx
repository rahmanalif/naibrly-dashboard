import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CirclePlus, Upload, Trash2, Edit, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { toast } from "sonner";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog states
  const [isAddCategoryTypeDialogOpen, setIsAddCategoryTypeDialogOpen] =
    useState(false);
  const [isEditCategoryTypeDialogOpen, setIsEditCategoryTypeDialogOpen] =
    useState(false);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [isEditServiceDialogOpen, setIsEditServiceDialogOpen] = useState(false);

  // Form states
  const [categoryName, setCategoryName] = useState("");
  const [categoryTypeName, setCategoryTypeName] = useState("");
  const [categoryTypeDescription, setCategoryTypeDescription] = useState("");
  const [services, setServices] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Edit states
  const [editCategoryType, setEditCategoryType] = useState(null);
  const [editService, setEditService] = useState(null);

  // Service form states
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [serviceRate, setServiceRate] = useState(50);
  const [selectedCategoryTypeName, setSelectedCategoryTypeName] = useState("");

  // Service input for creating category type
  const [serviceInput, setServiceInput] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/categories");
      if (response.data.success) {
        setCategories(response.data.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create Category Type with Services
  const handleCreateCategoryType = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryTypeName) {
      toast.error("Category name and category type name are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoryName", categoryName);
      formData.append("categoryTypeName", categoryTypeName);

      if (services.length > 0) {
        formData.append("services", services.join(","));
      }

      if (image) {
        formData.append("image", image);
      }

      const response = await api.post("/categories/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Category type created successfully");
        handleCloseDialogs();
        fetchCategories();
      }
    } catch (error) {
      console.error("Error creating category type:", error);
      toast.error(
        error.response?.data?.message || "Failed to create category type"
      );
    }
  };

  // Update Category Type
  const handleUpdateCategoryType = async (e) => {
    e.preventDefault();

    if (!editCategoryType) return;

    try {
      const formData = new FormData();

      if (categoryTypeName) {
        formData.append("name", categoryTypeName);
      }

      if (categoryTypeDescription) {
        formData.append("description", categoryTypeDescription);
      }

      if (image) {
        formData.append("image", image);
      }

      const response = await api.put(
        `/categories/type/${editCategoryType._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Category type updated successfully");
        handleCloseDialogs();
        fetchCategories();
      }
    } catch (error) {
      console.error("Error updating category type:", error);
      toast.error(
        error.response?.data?.message || "Failed to update category type"
      );
    }
  };

  // Delete Category Type
  const handleDeleteCategoryType = async (categoryTypeId) => {
    if (
      !confirm(
        "Are you sure you want to delete this category type? This will also delete all associated services."
      )
    ) {
      return;
    }

    try {
      const response = await api.delete(`/categories/type/${categoryTypeId}`);

      if (response.data.success) {
        toast.success("Category type deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting category type:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete category type"
      );
    }
  };

  // Add Service to Category Type
  const handleAddService = async (e) => {
    e.preventDefault();

    if (!selectedCategoryTypeName || !serviceName) {
      toast.error("Category type and service name are required");
      return;
    }

    try {
      const response = await api.post("/categories/add-service", {
        categoryTypeName: selectedCategoryTypeName,
        serviceName,
        serviceDescription,
      });

      if (response.data.success) {
        toast.success("Service added successfully");
        handleCloseDialogs();
        fetchCategories();
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error(error.response?.data?.message || "Failed to add service");
    }
  };

  // Update Service
  const handleUpdateService = async (e) => {
    e.preventDefault();

    if (!editService) return;

    try {
      const formData = new FormData();

      if (serviceName) {
        formData.append("name", serviceName);
      }

      if (serviceDescription) {
        formData.append("description", serviceDescription);
      }

      if (serviceRate) {
        formData.append("defaultHourlyRate", serviceRate);
      }

      if (image) {
        formData.append("image", image);
      }

      const response = await api.put(
        `/categories/service/${editService._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Service updated successfully");
        handleCloseDialogs();
        fetchCategories();
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error(error.response?.data?.message || "Failed to update service");
    }
  };

  // Delete Service
  const handleDeleteService = async (serviceId) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      const response = await api.delete(`/categories/service/${serviceId}`);

      if (response.data.success) {
        toast.success("Service deleted successfully");
        fetchCategories();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error(error.response?.data?.message || "Failed to delete service");
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Close all dialogs and reset form
  const handleCloseDialogs = () => {
    setIsAddCategoryTypeDialogOpen(false);
    setIsEditCategoryTypeDialogOpen(false);
    setIsAddServiceDialogOpen(false);
    setIsEditServiceDialogOpen(false);

    // Reset form
    setCategoryName("");
    setCategoryTypeName("");
    setCategoryTypeDescription("");
    setServices([]);
    setImage(null);
    setImagePreview(null);
    setEditCategoryType(null);
    setEditService(null);
    setServiceName("");
    setServiceDescription("");
    setServiceRate(50);
    setSelectedCategoryTypeName("");
    setServiceInput("");
  };

  // Open edit category type dialog
  const handleOpenEditCategoryType = (categoryType) => {
    setEditCategoryType(categoryType);
    setCategoryTypeName(categoryType.name);
    setCategoryTypeDescription(categoryType.description || "");
    setImagePreview(categoryType.image?.url || null);
    setIsEditCategoryTypeDialogOpen(true);
  };

  // Open edit service dialog
  const handleOpenEditService = (service) => {
    setEditService(service);
    setServiceName(service.name);
    setServiceDescription(service.description || "");
    setServiceRate(service.defaultHourlyRate || 50);
    setImagePreview(service.image?.url || null);
    setIsEditServiceDialogOpen(true);
  };

  // Add service to list (for create category type)
  const handleAddServiceToList = () => {
    if (serviceInput.trim()) {
      setServices([...services, serviceInput.trim()]);
      setServiceInput("");
    }
  };

  // Remove service from list
  const handleRemoveServiceFromList = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Get all category types for service dropdown
  const getAllCategoryTypes = () => {
    const categoryTypes = [];
    categories.forEach((category) => {
      category.categoryTypes?.forEach((type) => {
        categoryTypes.push({
          name: type.name,
          categoryName: category.name,
        });
      });
    });
    return categoryTypes;
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-96">
        <div className="text-lg">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Add Category Type Dialog */}
      <Dialog
        open={isAddCategoryTypeDialogOpen}
        onOpenChange={setIsAddCategoryTypeDialogOpen}
      >
        <DialogContent className="w-[480px] max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Add Category Type</DialogTitle>
            <DialogDescription>
              Create a new category type with optional services.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateCategoryType}>
            <div className="mb-4">
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700"
              >
                Select Category <span className="text-red-500">*</span>
              </label>
              <select
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Choose category</option>
                <option value="Interior">Interior</option>
                <option value="Exterior">Exterior</option>
                <option value="More Services">More Services</option>
                <option value="Additional Resources">
                  Additional Resources
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="categoryTypeName"
                className="block text-sm font-medium text-gray-700"
              >
                Category Type Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="categoryTypeName"
                type="text"
                value={categoryTypeName}
                onChange={(e) => setCategoryTypeName(e.target.value)}
                placeholder="e.g. Smart Home Technology"
                className="mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="uploadImage"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Image (Optional)
              </label>
              <div className="mt-2">
                <label
                  htmlFor="uploadImage"
                  className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-md py-8 flex justify-center items-center hover:border-blue-500 hover:bg-gray-50"
                >
                  <input
                    type="file"
                    id="uploadImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-400 flex flex-col items-center">
                      <Upload className="mx-auto mb-2" />
                      Click to upload image
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div className="mb-4">
              {/* <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Services (Optional)
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="e.g. Smart Lighting"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddServiceToList();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddServiceToList}
                  className="bg-[#0E7A60] text-white hover:bg-[#0E7A60]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div> */}

              {services.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {services.map((service, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-100 flex items-center gap-1"
                    >
                      {service}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleRemoveServiceFromList(index)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                onClick={handleCloseDialogs}
                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0E7A60] text-white hover:bg-[#0E7A60]"
              >
                Create Category Type
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Type Dialog */}
      <Dialog
        open={isEditCategoryTypeDialogOpen}
        onOpenChange={setIsEditCategoryTypeDialogOpen}
      >
        <DialogContent className="w-[480px] max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Edit Category Type</DialogTitle>
            <DialogDescription>Update category type details.</DialogDescription>
          </DialogHeader>

          {editCategoryType && (
            <form onSubmit={handleUpdateCategoryType}>
              <div className="mb-4">
                <label
                  htmlFor="editCategoryTypeName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Type Name
                </label>
                <Input
                  id="editCategoryTypeName"
                  type="text"
                  value={categoryTypeName}
                  onChange={(e) => setCategoryTypeName(e.target.value)}
                  placeholder="Enter category type name"
                  className="mt-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editCategoryTypeDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="editCategoryTypeDescription"
                  value={categoryTypeDescription}
                  onChange={(e) => setCategoryTypeDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editUploadImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="editUploadImage"
                    className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-md py-8 flex justify-center items-center hover:border-blue-500 hover:bg-gray-50"
                  >
                    <input
                      type="file"
                      id="editUploadImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400 flex flex-col items-center">
                        <Upload className="mx-auto mb-2" />
                        Click to upload image
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={handleCloseDialogs}
                  className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#0E7A60] text-white hover:bg-[#0E7A60]"
                >
                  Update Category Type
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog
        open={isAddServiceDialogOpen}
        onOpenChange={setIsAddServiceDialogOpen}
      >
        <DialogContent className="w-[480px] bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
            <DialogDescription>
              Add a new service to an existing category type.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddService}>
            <div className="mb-4">
              <label
                htmlFor="selectCategoryType"
                className="block text-sm font-medium text-gray-700"
              >
                Select Category Type <span className="text-red-500">*</span>
              </label>
              <select
                id="selectCategoryType"
                value={selectedCategoryTypeName}
                onChange={(e) => setSelectedCategoryTypeName(e.target.value)}
                className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Choose category type</option>
                {getAllCategoryTypes().map((type, index) => (
                  <option key={index} value={type.name}>
                    {type.name} ({type.categoryName})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-gray-700"
              >
                Service Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="serviceName"
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. Solar Panel Installation"
                className="mt-2"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="serviceDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </label>
              <Textarea
                id="serviceDescription"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                placeholder="Enter service description..."
                rows={3}
                className="mt-2"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                type="button"
                onClick={handleCloseDialogs}
                className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#0E7A60] text-white hover:bg-[#0E7A60]"
              >
                Add Service
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog
        open={isEditServiceDialogOpen}
        onOpenChange={setIsEditServiceDialogOpen}
      >
        <DialogContent className="w-[480px] max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>Update service details.</DialogDescription>
          </DialogHeader>

          {editService && (
            <form onSubmit={handleUpdateService}>
              <div className="mb-4">
                <label
                  htmlFor="editServiceName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Name
                </label>
                <Input
                  id="editServiceName"
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="Enter service name"
                  className="mt-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editServiceDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="editServiceDescription"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editServiceRate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Default Hourly Rate ($)
                </label>
                <Input
                  id="editServiceRate"
                  type="number"
                  value={serviceRate}
                  onChange={(e) => setServiceRate(e.target.value)}
                  placeholder="50"
                  className="mt-2"
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editServiceImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Image
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="editServiceImage"
                    className="w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-md py-8 flex justify-center items-center hover:border-blue-500 hover:bg-gray-50"
                  >
                    <input
                      type="file"
                      id="editServiceImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400 flex flex-col items-center">
                        <Upload className="mx-auto mb-2" />
                        Click to upload image
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  onClick={handleCloseDialogs}
                  className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#0E7A60] text-white hover:bg-[#0E7A60]"
                >
                  Update Service
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Header Actions */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <Button
          className="bg-white text-[#666666] hover:bg-white hover:text-[#666666] font-medium lg:text-sm"
          onClick={() => setIsAddServiceDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-1" /> Add Service
        </Button>
        <Button
          className="bg-white text-[#666666] hover:bg-white hover:text-[#666666] font-medium lg:text-sm"
          onClick={() => setIsAddCategoryTypeDialogOpen(true)}
        >
          <CirclePlus className="w-4 h-4 mr-1" /> Add Category Type
        </Button>
      </div>

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No categories found</p>
          <p className="text-gray-400 text-sm mt-2">
            Start by creating a new category type
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category._id}>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {category.name}
                <span className="text-sm font-normal text-gray-500 ml-3">
                  ({category.categoryTypes?.length || 0} types)
                </span>
              </h2>

              {category.categoryTypes && category.categoryTypes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.categoryTypes.map((categoryType) => (
                    <Card
                      key={categoryType._id}
                      className="shadow-lg hover:shadow-xl transition duration-300"
                    >
                      {categoryType.image?.url && (
                        <div className="w-100 h-64 flex-shrink-0 mx-auto ">
                          <img
                            src={categoryType.image.url}
                            alt={categoryType.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {categoryType.name}
                            </CardTitle>
                            <p className="text-sm text-gray-600 mt-1">
                              {categoryType.description ||
                                `${categoryType.name} services`}
                            </p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        {/* Services List */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">
                            Services ({categoryType.services?.length || 0})
                          </h4>
                          {categoryType.services &&
                          categoryType.services.length > 0 ? (
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                              {categoryType.services.map((service) => (
                                <div
                                  key={service._id}
                                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100"
                                >
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                      {service.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      ${service.defaultHourlyRate}/hr
                                    </p>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() =>
                                        handleOpenEditService(service)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                                          stroke="#292D32"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M16.0399 3.02025L8.15988 10.9003C7.85988 11.2003 7.55988 11.7903 7.49988 12.2203L7.06988 15.2303C6.90988 16.3203 7.67988 17.0803 8.76988 16.9303L11.7799 16.5003C12.1999 16.4403 12.7899 16.1403 13.0999 15.8403L20.9799 7.96025C22.3399 6.60025 22.9799 5.02025 20.9799 3.02025C18.9799 1.02025 17.3999 1.66025 16.0399 3.02025Z"
                                          stroke="#292D32"
                                          stroke-width="1.5"
                                          stroke-miterlimit="10"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M14.9099 4.15039C15.5799 6.54039 17.4499 8.41039 19.8499 9.09039"
                                          stroke="#292D32"
                                          stroke-width="1.5"
                                          stroke-miterlimit="10"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                      onClick={() =>
                                        handleDeleteService(service._id)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="22"
                                        viewBox="0 0 20 22"
                                        fill="none"
                                      >
                                        <path
                                          opacity="0.4"
                                          d="M17.5825 14.4064C17.5058 15.6596 17.4449 16.6541 17.3202 17.4484C17.1922 18.2631 16.9874 18.9415 16.5777 19.5349C16.2029 20.0778 15.7204 20.536 15.1608 20.8803C14.5491 21.2567 13.8661 21.4213 13.0531 21.5L6.92739 21.4999C6.1135 21.421 5.42972 21.2561 4.8176 20.879C4.25763 20.5341 3.77494 20.0751 3.40028 19.5313C2.99073 18.9369 2.78656 18.2575 2.65957 17.4417C2.53574 16.6462 2.47623 15.6503 2.40122 14.3953L1.75 3.5H18.25L17.5825 14.4064Z"
                                          fill="#F34F4F"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M7.5 16.7148C7.08579 16.7148 6.75 16.3791 6.75 15.9648L6.75 9.96484C6.75 9.55063 7.08579 9.21484 7.5 9.21484C7.91421 9.21484 8.25 9.55063 8.25 9.96484L8.25 15.9648C8.25 16.3791 7.91421 16.7148 7.5 16.7148Z"
                                          fill="#F34F4F"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12.5 9.21484C12.9142 9.21484 13.25 9.55063 13.25 9.96484L13.25 15.9648C13.25 16.3791 12.9142 16.7148 12.5 16.7148C12.0858 16.7148 11.75 16.3791 11.75 15.9648L11.75 9.96484C11.75 9.55063 12.0858 9.21484 12.5 9.21484Z"
                                          fill="#F34F4F"
                                        />
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M11.3473 0.0327679C11.9124 0.0833095 12.4435 0.255757 12.8996 0.595912C13.2369 0.847476 13.4712 1.15542 13.6714 1.48893C13.8569 1.79798 14.0437 2.1833 14.2555 2.6204L14.6823 3.5007H19C19.5523 3.5007 20 3.94842 20 4.5007C20 5.05299 19.5523 5.5007 19 5.5007C12.9998 5.5007 7.00019 5.5007 1 5.5007C0.447715 5.5007 0 5.05299 0 4.5007C0 3.94842 0.447715 3.5007 1 3.5007H5.40976L5.76556 2.72016C5.97212 2.26696 6.15403 1.86782 6.33676 1.54754C6.53387 1.20207 6.76721 0.882367 7.10861 0.620456C7.57032 0.266256 8.11215 0.0866864 8.68992 0.0340876C9.12492 -0.00551367 9.56344 -6.29583e-05 10 0.000638653C10.5108 0.00145956 10.97 -0.000980195 11.3473 0.0327679ZM7.60776 3.5007H12.4597C12.233 3.03331 12.088 2.73707 11.9566 2.5182C11.7643 2.19787 11.5339 2.05745 11.1691 2.02482C10.9098 2.00163 10.5719 2.0007 10.0345 2.0007C9.48371 2.0007 9.13697 2.00166 8.87124 2.02585C8.49714 2.05991 8.26389 2.20568 8.07391 2.53866C7.94941 2.75687 7.81387 3.04897 7.60776 3.5007Z"
                                          fill="#F34F4F"
                                        />
                                      </svg>
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400">
                              No services added yet
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Button
                            variant="ghost"
                            className="flex-1 text-white bg-[#0E7A60] hover:text-white hover:bg-[#0E7A60]"
                            onClick={() =>
                              handleOpenEditCategoryType(categoryType)
                            }
                          >
                            <Edit className="w-4 h-4 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="ghost"
                            className="flex-1 text-white bg-red-600 hover:text-white hover:bg-red-700"
                            onClick={() =>
                              handleDeleteCategoryType(categoryType._id)
                            }
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No category types in {category.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;

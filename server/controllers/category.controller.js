import Category from "../models/category.model.js";

export const addCategory = async (req, res, next) => {
    const { id, category_name } = req.body;

    if (!id || !category_name || id === "" || category_name === "") {
        return res.status(400).json({
            msg: "All fields are required!"
        });
    }

    const newCategory = new Category({
        id,
        category_name
    });

    try {
        await newCategory.save();
        res.status(201).json({
            msg: "Category successfully added!"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Server Error",
            error: error.message
        });
    }
};



export const getallCategory  = async (req, res, next) => {
    try {
        const categoty = await Category.find();
        
        res.json({
            msg: "All the categories are displayed!",
            data: categoty, // Include the retrieved data
        });

    } catch (error) {
        res.status(400).json({
            msg: "Some error happened!",
            error: error.message,
        });
    }
};

export const getCategoryById = (req, res) => {
    try {
        const { id } = req.query; // If it's a query param
        // const { id } = req.params; // Uncomment if using path params

        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        // if (!Inventory || !Array.isArray(Inventory)) {
        //     return res.status(500).json({ msg: "Inventory data is missing or incorrect" });
        // }

        const item = Category.find(i => i.id == id);

        if (!item) {
            return res.status(404).json({ msg: "Item not found" });
        }

        return res.status(200).json({ data: item });

    } catch (error) {
        console.error("Error fetching category:", error);
        return res.status(500).json({ msg: "Some category error happened!" });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params; // Get ID from URL params
    const { category_name } = req.body; // Get new data from request body

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id, 
            { category_name: category_name }, // Update only category_name
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ msg: "Category not found!" });
        }

        res.json({ msg: "Category updated successfully!", updatedCategory });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    const { id } = req.params; // Get ID from URL params

    try {
        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ msg: "Category not found!" });
        }

        res.json({ msg: "Category deleted successfully!" });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};


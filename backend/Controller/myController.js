const ClozeForm = require("../models/ClozeForm");
const CategorizeForm = require("../models/CategorizeForm")
const ComprehensionForm = require("../models/ComprehensionForm")

exports.categorizeSubmit = async (req, res, next) => {
  try {
    const { description, category, solutions } = req.body;

    // Create a new instance of the CategorizeForm model
    const newCategorizeForm = new CategorizeForm({
      description,
      category,
      solutions,
    });

    // Save the new form data to the database
    await newCategorizeForm.save();

    res.status(201).json({ message: "Categorize form data saved successfully" });
  } catch (error) {
    console.error("Error saving categorize form data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.clozeSubmit = async (req, res, next) => {
    try {
      const { preview, questionSentence, options } = req.body;
  
      // Create a new instance of the CategorizeForm model
      const newCategorizeForm = new ClozeForm({
        preview,
        questionSentence,
        options
      });
  
      // Save the new form data to the database
      await newCategorizeForm.save();
  
      res.status(201).json({ message: "Cloze form data saved successfully" });
    } catch (error) {
      console.error("Error saving cloze form data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

exports.comprehensionSubmit = async (req, res, next) => {
    try {
      const { passage, mcqQuestions } = req.body;
  
      // Create a new instance of the CategorizeForm model
      const newCategorizeForm = new ComprehensionForm({
        passage,
        mcqQuestions
      });
  
      // Save the new form data to the database
      await newCategorizeForm.save();
  
      res.status(201).json({ message: "Comprehension form data saved successfully" });
    } catch (error) {
      console.error("Error saving comprehension form data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  exports.categorizeQuestion = async (req, res, next) => {
     try{
        const allQuestions = await CategorizeForm.find();

        const lastQuestion = allQuestions[allQuestions.length - 1];
        
        res.status(200).json(lastQuestion);
     }
     catch(err){
      console.error('Error fetching Categorize Questions', err);
      res.status(500).json({ error: "Internal server error" });
     }
  }

  exports.clozeQuestion = async (req, res, next) => {
    try{
       const allQuestions = await ClozeForm.find();

       const lastQuestion = allQuestions[allQuestions.length - 1];
       
       res.status(200).json(lastQuestion);
    }
    catch(err){
     console.error('Error fetching Cloze Questions', err);
     res.status(500).json({ error: "Internal server error" });
    }
 }

 exports.comprehensionQuestion = async (req, res, next) => {
  try{
     const allQuestions = await ComprehensionForm.find();

     const lastQuestion = allQuestions[allQuestions.length - 1];
     
     res.status(200).json(lastQuestion);
  }
  catch(err){
   console.error('Error fetching Comprehension Questions', err);
   res.status(500).json({ error: "Internal server error" });
  }
}
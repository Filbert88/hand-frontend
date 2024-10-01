"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { User, Pill, HelpCircle, BookOpen, ArrowLeft } from "lucide-react";

// Define types for form inputs
type TherapistForm = {
  name: string;
  specialization: string;
  bio: string;
};

type MedicationsForm = {
  medName: string;
  dosage: string;
  sideEffects: string;
};

type HelpForm = {
  topic: string;
  category: string;
  content: string;
};

type ArticlesForm = {
  title: string;
  type: string;
  content: string;
};

// Main component
export default function AddPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Therapist";
  const [category, setCategory] = useState(initialCategory);

  // Form states based on category
  const [therapistForm, setTherapistForm] = useState<TherapistForm>({
    name: "",
    specialization: "",
    bio: "",
  });
  const [medicationsForm, setMedicationsForm] = useState<MedicationsForm>({
    medName: "",
    dosage: "",
    sideEffects: "",
  });
  const [helpForm, setHelpForm] = useState<HelpForm>({
    topic: "",
    category: "",
    content: "",
  });
  const [articlesForm, setArticlesForm] = useState<ArticlesForm>({
    title: "",
    type: "",
    content: "",
  });

  const categories = [
    { name: "Therapist", icon: User, color: "bg-[#D7CEC7]" },
    { name: "Medications", icon: Pill, color: "bg-[#F3D7D7]" },
    { name: "Help", icon: HelpCircle, color: "bg-[#D7E7E8]" },
    { name: "Articles", icon: BookOpen, color: "bg-[#E1D7E8]" },
  ];

  const getCategoryColor = (name: string) => {
    return categories.find((cat) => cat.name === name)?.color || "bg-gray-200";
  };

  const getCategoryIcon = (name: string) => {
    const CategoryIcon =
      categories.find((cat) => cat.name === name)?.icon || User;
    return <CategoryIcon className="w-6 h-6" />;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let apiUrl = "";
    let payload = {};

    switch (category) {
      case "Therapist":
        apiUrl = "/api/therapists";
        payload = therapistForm;
        break;
      case "Medications":
        apiUrl = "/api/medications";
        payload = medicationsForm;
        break;
      case "Help":
        apiUrl = "/api/help";
        payload = helpForm;
        break;
      case "Articles":
        apiUrl = "/api/media/create";
        payload = articlesForm;
        break;
      default:
        return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Successfully added!");
        router.push("/dashboard");
      } else {
        alert("Failed to add. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while adding the item.");
    }
  };

  return (
    <div className="min-h-screen bg-[#4A4A4A] text-white pt-24 px-10 sm:px-20">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-gloock">Hello, Admin!</h1>
      </header>

      <div
        className={`${getCategoryColor(category)} text-black p-4 rounded-lg`}
      >
        <div className="flex flex-row items-center justify-between mb-4">
          <button
            className="text-black flex items-center"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Back
          </button>
          <div className="text-2xl flex items-center">
            {getCategoryIcon(category)}
            <span className="ml-2">Add {category}</span>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {category === "Therapist" && (
            <>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={therapistForm.name}
                  onChange={(e) =>
                    setTherapistForm({ ...therapistForm, name: e.target.value })
                  }
                  placeholder="Enter therapist's name"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="specialization">Specialization</label>
                <input
                  id="specialization"
                  value={therapistForm.specialization}
                  onChange={(e) =>
                    setTherapistForm({
                      ...therapistForm,
                      specialization: e.target.value,
                    })
                  }
                  placeholder="Enter specialization"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={therapistForm.bio}
                  onChange={(e) =>
                    setTherapistForm({ ...therapistForm, bio: e.target.value })
                  }
                  placeholder="Enter therapist's bio"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}
          {category === "Medications" && (
            <>
              <div>
                <label htmlFor="medName">Medication Name</label>
                <input
                  id="medName"
                  value={medicationsForm.medName}
                  onChange={(e) =>
                    setMedicationsForm({
                      ...medicationsForm,
                      medName: e.target.value,
                    })
                  }
                  placeholder="Enter medication name"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="dosage">Dosage</label>
                <input
                  id="dosage"
                  value={medicationsForm.dosage}
                  onChange={(e) =>
                    setMedicationsForm({
                      ...medicationsForm,
                      dosage: e.target.value,
                    })
                  }
                  placeholder="Enter dosage"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="sideEffects">Side Effects</label>
                <textarea
                  id="sideEffects"
                  value={medicationsForm.sideEffects}
                  onChange={(e) =>
                    setMedicationsForm({
                      ...medicationsForm,
                      sideEffects: e.target.value,
                    })
                  }
                  placeholder="Enter potential side effects"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}
          {category === "Help" && (
            <>
              <div>
                <label htmlFor="topic">Help Topic</label>
                <input
                  id="topic"
                  value={helpForm.topic}
                  onChange={(e) =>
                    setHelpForm({ ...helpForm, topic: e.target.value })
                  }
                  placeholder="Enter help topic"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  value={helpForm.category}
                  onChange={(e) =>
                    setHelpForm({ ...helpForm, category: e.target.value })
                  }
                  placeholder="Enter category"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="content">Help Content</label>
                <textarea
                  id="content"
                  value={helpForm.content}
                  onChange={(e) =>
                    setHelpForm({ ...helpForm, content: e.target.value })
                  }
                  placeholder="Enter help content"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
            </>
          )}
          {category === "Articles" && (
            <>
              <div>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={articlesForm.title}
                  onChange={(e) =>
                    setArticlesForm({
                      ...articlesForm,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter title"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="type">Type</label>
                <input
                  id="type"
                  value={articlesForm.type}
                  onChange={(e) =>
                    setArticlesForm({
                      ...articlesForm,
                      type: e.target.value,
                    })
                  }
                  placeholder="Article or Video"
                  className="w-full p-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="content">Content/URL</label>
                <textarea
                  id="content"
                  value={articlesForm.content}
                  onChange={(e) =>
                    setArticlesForm({
                      ...articlesForm,
                      content: e.target.value,
                    })
                  }
                  placeholder="Enter content or video URL"
                  className="w-full p-2 border rounded-lg focus:outline-nonee"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-[#4A4A4A] text-white p-2 hover:bg-[#3A3A3A] rounded-lg"
          >
            Add {category}
          </button>
        </form>
      </div>
    </div>
  );
}

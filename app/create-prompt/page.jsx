"use client";
import React, { useId, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
function CreatePrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const data = [
    {
      prompt:
        "Time management is a crucial skill that can greatly increase productivity and reduce stress. It involves setting clear priorities, organizing tasks efficiently, and learning how to manage distractions. Strategies like time-blocking, setting achievable goals, and using productivity tools can help you make the most of your time.",
      tags: [
        "productivity",
        "time-management",
        "self-improvement",
        "efficiency",
      ],
    },
    {
      prompt:
        "Artificial Intelligence (AI) is revolutionizing the healthcare industry by enabling faster diagnoses, personalized treatment plans, and predictive analytics. AI algorithms can analyze medical data, such as images and patient history, to assist doctors in decision-making, improving patient outcomes, and accelerating drug discovery.",
      tags: [
        "artificial-intelligence",
        "healthcare",
        "technology",
        "future-of-healthcare",
      ],
    },
    {
      prompt:
        "Successful remote team collaboration requires clear communication, trust, and the right tools. Best practices include setting regular check-ins, using collaboration tools like Slack and Zoom, establishing clear goals and deadlines, and creating a culture of openness and accountability to maintain team cohesion and productivity.",
      tags: ["teamwork", "collaboration", "remote-work", "work-from-home"],
    },
    {
      prompt:
        "Creating a mobile app involves several key steps: idea conceptualization, wireframing, design, development, testing, and launch. It begins with understanding the target audience and defining the app's core features. Then, developers build the app using appropriate technologies (e.g., Swift for iOS or Kotlin for Android), followed by user testing to ensure functionality before release.",
      tags: [
        "mobile-development",
        "app-development",
        "programming",
        "tech-tutorial",
      ],
    },
    {
      prompt:
        "Building a personal brand online involves curating your digital presence to showcase your expertise, personality, and values. Start by identifying your niche, creating a consistent message across social media platforms, and engaging with your audience regularly. Content creation, networking, and leveraging platforms like LinkedIn, Instagram, or Medium can help establish a strong personal brand.",
      tags: [
        "personal-branding",
        "marketing",
        "social-media",
        "career-development",
      ],
    },
    {
      prompt:
        "Learning multiple languages opens up many opportunities, both personally and professionally. It improves cognitive abilities, enhances cultural understanding, and boosts employability in an increasingly globalized job market. Additionally, learning a new language can improve communication skills and increase confidence when traveling or interacting with diverse groups.",
      tags: ["language-learning", "self-improvement", "education", "culture"],
    },
    {
      prompt:
        "Blockchain is a decentralized, distributed ledger technology that securely records transactions across multiple computers. Its applications extend far beyond cryptocurrencies like Bitcoin. Blockchain can be used for secure voting systems, supply chain management, and digital contracts (smart contracts), as it ensures transparency, immutability, and security in data handling.",
      tags: ["blockchain", "cryptocurrency", "fintech", "technology"],
    },
    {
      prompt:
        "Entrepreneurs often face several challenges, including securing funding, building a customer base, managing time and resources effectively, and dealing with competition. Other difficulties include navigating legal requirements, scaling the business, and maintaining a work-life balance. Overcoming these challenges requires resilience, adaptability, and strategic planning.",
      tags: ["entrepreneurship", "business-tips", "startup", "challenges"],
    },
    {
      prompt:
        "Machine learning and deep learning are both subsets of artificial intelligence, but they differ in complexity and application. Machine learning uses algorithms to analyze data and make predictions based on patterns, whereas deep learning uses neural networks with multiple layers to analyze large amounts of data and learn features on its own. Deep learning is typically used for more complex tasks like image and speech recognition.",
      tags: [
        "machine-learning",
        "artificial-intelligence",
        "technology",
        "data-science",
      ],
    },
    {
      prompt:
        "Mindfulness meditation involves focusing on the present moment and being aware of your thoughts, feelings, and sensations without judgment. Regular mindfulness practice has been shown to reduce stress, anxiety, and depression, improve emotional regulation, and enhance overall mental clarity. It promotes mental well-being by encouraging a non-reactive, calm state of mind.",
      tags: ["mindfulness", "mental-health", "meditation", "wellness"],
    },
  ];

  const router = useRouter();
  const { data: session } = useSession();
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
}

export default CreatePrompt;

const members = [
  {
    name: "Bunny",
    image: "/bunny.jpeg",
    title: "KL SHOOTS",
    description:
      "is the creative force behind KL SHOOTS, capturing the people, moments and stories that shape KL RUNS.",
    shortDescription:
      "Photography, event coverage and visual content for KL RUNS.",
    details: [
      "Photography",
      "Event Coverage",
      "Visual Content",
      "KL SHOOTS",
    ],
  },

  {
    name: "Ashok",
    image: "/ashok.jpg",
    title: "DESIGN",
    description:
      "Shapes the visual identity and creative direction of KL RUNS through design, content and storytelling.",
    shortDescription:
      "Design, graphics and visual direction for KL RUNS.",
    details: [
      "Graphic Design",
      "Content Creation",
      "Storytelling",
      "KL MEDIA",
    ],
  },

  {
    name: "Rahul",
    image: "/rahul.jpeg",
    title: "WEB",
    description:
      "Builds and maintains the digital side of KL RUNS.",
    shortDescription:
      "Web development, technology and digital systems for KL RUNS.",
    details: [
      "Web Development",
      "Visual Design",
      "Creative Direction",
      "KL DESIGN",
    ],
  },

  {
    name: "Sunny",
    image: "/sunny.jpeg",
    title: "FINANCE",
    description:
      "Manages finances, budgets, and financial planning.",
    shortDescription:
      "Event planning, coordination and execution for KL RUNS.",
    details: [
      "Event Planning",
      "Coordination",
      "Finance and Budgeting",
      "KL EVENTS",
    ],
  },

  {
    name: "T-Rex",
    image: "/member5.jpg",
    title: "Exectuive",
    description:
      "Turns ideas into action and gets things done.",
    shortDescription:
      "Web development, technology and digital systems for KL RUNS.",
    details: [
      "Coordination",
      "Technology",
      "Digital Systems",
      "KL TECH",
    ],
  },

  {
    name: "Siddhu",
    image: "/siddhu.jpeg",
    title: "CORE",
    description:
      "Handles core operations and keeps the team moving.",
    shortDescription:
      "Creative direction, ideas and content for KL RUNS.",
    details: [
      "Creative",
      "Content",
      "Ideas",
      "KL CREATIVE",
    ],
  },

  {
    name: "Swaroop",
    image: "/swaroop.jpeg",
    title: "Magement",
    description:
      "Builds connections and manages team relationships.",
    shortDescription:
      "Creative direction, ideas and content for KL RUNS.",
    details: [
      "Management",
      "Content",
      "Ideas",
      "KL CREATIVE",
    ],
  },
];

function AboutMember({ member }) {
  return (
    <section className="about-member">
      <div className="about-layout">

        {/* LEFT SIDE */}

        <div className="about-left">

          <div className="about-label">
            ABOUT ME
          </div>

          <div className="about-skills">
            {member.details.map((detail, index) => (
              <div
                className="about-detail"
                key={detail}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{detail}</p>
              </div>
            ))}
          </div>

        </div>

        {/* IMAGE */}

        <div className="about-image-column">
          <img
            src={member.image}
            alt={member.name}
            className="about-image"
          />
        </div>

        {/* RIGHT SIDE */}

        <div className="about-content">

          <h1 className="about-heading">

            <span className="about-light">
              {member.title}
            </span>

            <span className="about-name">
              {member.name}
            </span>

            <span className="about-light">
              {member.description}
            </span>

          </h1>

          <p className="about-description">
            {member.shortDescription}
          </p>

        </div>

      </div>
    </section>
  );
}

function About() {
  return (
    <main className="about-page">

      {members.map((member) => (
        <AboutMember
          key={member.name}
          member={member}
        />
      ))}

    </main>
  );
}

export default About;
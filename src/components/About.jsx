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
    name: "Rahul",
    image: "/rahul.jpeg",
    title: "KL WEB",
    description:
      "brings ideas to life through thoughtful design, visual systems and creative work for KL RUNS.",
    shortDescription:
      "Design, graphics and visual direction for KL RUNS.",
    details: [
      "Graphic Design",
      "Visual Design",
      "Creative Direction",
      "KL DESIGN",
    ],
  },

  {
    name: "Ashok",
    image: "/ashok.jpg",
    title: "KL DESIGN",
    description:
      "creates digital content and visual stories that connect people with the energy and identity of KL RUNS.",
    shortDescription:
      "Creative media, digital content and visual storytelling for KL RUNS.",
    details: [
      "Media",
      "Content Creation",
      "Storytelling",
      "KL MEDIA",
    ],
  },

  {
    name: "Member 04",
    image: "/member4.jpg",
    title: "KL EVENTS",
    description:
      "helps bring KL RUNS events together through planning, coordination and experiences built around the community.",
    shortDescription:
      "Event planning, coordination and execution for KL RUNS.",
    details: [
      "Event Planning",
      "Coordination",
      "Operations",
      "KL EVENTS",
    ],
  },

  {
    name: "Member 05",
    image: "/member5.jpg",
    title: "KL TECH",
    description:
      "builds the digital side of KL RUNS through web applications, technology and simple systems that support the team.",
    shortDescription:
      "Web development, technology and digital systems for KL RUNS.",
    details: [
      "Web Development",
      "Technology",
      "Digital Systems",
      "KL TECH",
    ],
  },

  {
    name: "Member 06",
    image: "/member6.jpg",
    title: "KL CREATIVE",
    description:
      "brings ideas, creativity and visual thinking together to help shape the identity and direction of KL RUNS.",
    shortDescription:
      "Creative direction, ideas and content for KL RUNS.",
    details: [
      "Creative",
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
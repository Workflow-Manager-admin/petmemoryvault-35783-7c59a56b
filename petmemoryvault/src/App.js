import React, { useState } from "react";
import "./App.css";

// --- THEME COLORS, will override in style objects ---
const THEME = {
  primary: "#F7C59F",     // Sandy/Vanilla
  secondary: "#A3C6C4",   // Soft Teal
  accent: "#F67280",      // Pink Coral
  lightBg: "#fff",
  lightText: "#222",
  muted: "#f9f8f8"
};

// --- DEFAULT PAW IMAGE DATA URI ----
const DEFAULT_PAW =
  "data:image/svg+xml;utf8,<svg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'><ellipse cx='36' cy='44' rx='18' ry='27' fill='%23A3C6C4'/><ellipse cx='84' cy='44' rx='18' ry='27' fill='%23A3C6C4'/><ellipse cx='60' cy='64' rx='22' ry='31' fill='%23F7C59F'/><ellipse cx='27' cy='88' rx='11' ry='8' fill='%23F67280'/><ellipse cx='93' cy='88' rx='11' ry='8' fill='%23F67280'/></svg>";

// --- NAVIGATION TABS ---
const NAV_TABS = [
  { label: "Timeline", key: "timeline" },
  { label: "Photos", key: "photos" },
  { label: "Milestones", key: "milestones" },
  { label: "Scrapbook", key: "scrapbook" },
  { label: "Share", key: "share" }
];

// =================== LAYOUT COMPONENTS =================== //

function Navbar({ currTab, setTab }) {
  return (
    <nav style={{
      background: THEME.primary,
      borderBottom: `2px solid ${THEME.accent}`,
      position: "sticky",
      top: 0,
      zIndex: 99,
      boxShadow: "0 2px 6px rgba(247,197,159,0.06)"
    }}>
      <div style={{ maxWidth: 950, margin: "0 auto", display: "flex", alignItems: "center", padding: "12px 22px 6px" }}>
        <span style={{
          fontWeight: 700,
          fontSize: 22,
          color: THEME.accent,
          display: "flex",
          alignItems: "center"
        }}>
          <span style={{
            fontSize: 27, marginRight: 8
          }}>🐾</span> PetMemoryVault
        </span>
        <div style={{
          display: "flex",
          gap: 8,
          marginLeft: "auto"
        }}>
          {NAV_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              style={{
                background: tab.key === currTab ? THEME.secondary : "transparent",
                color: THEME.lightText,
                border: "none",
                borderBottom: tab.key === currTab ? `3px solid ${THEME.accent}` : "3px solid transparent",
                fontWeight: 500,
                fontSize: 17,
                padding: tab.key === currTab ? "8px 20px" : "8px 18px",
                borderRadius: 5,
                cursor: "pointer",
                transition: "background 0.12s"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// =================== PET PROFILE =================== //

function PetProfile({ profilePhoto, setProfilePhoto, petName, setPetName }) {
  const handleChange = e => {
    if (e.target.files && e.target.files[0]) {
      const r = new FileReader();
      r.onload = ev => setProfilePhoto(ev.target.result);
      r.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <section style={{
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "40px 0 25px"
    }}>
      <div style={{ position: "relative", marginBottom: 15 }}>
        <img
          src={profilePhoto || DEFAULT_PAW}
          alt="Pet"
          style={{
            width: 130,
            height: 130,
            objectFit: "cover",
            borderRadius: "50%",
            background: THEME.secondary + "44",
            border: `4px solid ${THEME.primary}`,
            boxShadow: `0 2px 8px ${THEME.secondary}33`
          }}
        />
        <label htmlFor="profile-upload" style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          cursor: "pointer",
        }}>
          <span style={{
            display: "inline-block",
            background: THEME.accent,
            color: "white",
            fontWeight: 700,
            borderRadius: "50%",
            width: 39,
            height: 39,
            fontSize: 21,
            textAlign: "center",
            lineHeight: "37px",
            boxShadow: "0 2px 6px rgba(246,114,128,0.18)"
          }}>✚</span>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
        </label>
      </div>
      <input
        placeholder="Pet's Name"
        value={petName}
        spellCheck={false}
        maxLength={24}
        onChange={e => setPetName(e.target.value)}
        style={{
          textAlign: "center",
          border: `2px solid ${THEME.secondary}`,
          borderRadius: 6,
          outline: "none",
          padding: "7px 18px",
          fontSize: 22,
          fontWeight: 600,
          background: THEME.lightBg,
          color: THEME.lightText,
          marginBottom: 3
        }}
      />
    </section>
  );
}

// =================== TIMELINE & ADD MEMORY =================== //

function Timeline({
  memories, addMemory, profilePhoto, petName
}) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div style={{ margin: "28px 0 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{
          fontWeight: 700,
          fontSize: 27,
          color: THEME.accent
        }}>{petName || "Your Pet"}'s Timeline</h2>
        <button style={buttonStyle(THEME)} onClick={() => setShowForm(v => !v)}>
          {showForm ? "Close" : "Add Memory"}
        </button>
      </div>
      {showForm &&
        <AddMemoryForm addMemory={addMemory} onClose={() => setShowForm(false)} />}
      {memories.length === 0 ? (
        <div style={{
          textAlign: "center",
          marginTop: 40,
          color: THEME.secondary,
          fontStyle: "italic"
        }}>
          No memories yet. Click "Add Memory" to start your story!
        </div>
      ) : (
        <div>
          {memories
            .slice()
            .reverse()
            .map((mem, idx) => (
            <div key={mem.id} style={{
              background: THEME.muted,
              borderLeft: `7px solid ${THEME.secondary}`,
              borderRadius: 14,
              margin: "22px 0",
              padding: "18px 23px"
            }}>
              <div style={{ display: "flex", gap: 20 }}>
                {mem.photo ? (
                  <img
                    src={mem.photo}
                    alt="memory"
                    style={{ width: 86, height: 86, objectFit: "cover", borderRadius: 13, border: `2px solid ${THEME.secondary}` }}
                  />
                ) : (
                  <div style={{
                    width: 86, height: 86, background: "#f0f0f0", borderRadius: 13,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: THEME.secondary, fontSize: 34, border: `2px solid ${THEME.secondary}`
                  }}>
                    🐾
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ color: THEME.accent, fontWeight: 700, fontSize: 16, marginBottom: 3 }}>
                    {mem.title}
                  </div>
                  <div style={{ whiteSpace: "pre-line", marginBottom: 7 }}>
                    {mem.description}
                  </div>
                  <div style={{ fontSize: 13, color: THEME.secondary }}>
                    {new Date(mem.date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AddMemoryForm({ addMemory, onClose }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");

  function handleFile(e) {
    if (e.target.files && e.target.files[0]) {
      const r = new FileReader();
      r.onload = ev => setPhoto(ev.target.result);
      r.readAsDataURL(e.target.files[0]);
    }
  }
  function submit(e) {
    e.preventDefault();
    if (!title.trim() && !desc.trim() && !photo) return;
    addMemory({
      title: title.trim() || "A Special Moment",
      description: desc.trim(),
      photo,
      date: Date.now()
    });
    setTitle(""); setDesc(""); setPhoto("");
    onClose();
  }
  return (
    <form onSubmit={submit} style={{
      background: THEME.secondary + "10",
      border: `2px solid ${THEME.secondary}`,
      borderRadius: 13,
      padding: 22,
      margin: "17px 0"
    }}>
      <div style={{ marginBottom: 10 }}>
        <input required
          style={inputStyle(THEME)}
          placeholder="Memory Title"
          value={title}
          maxLength={50}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 10 }}>
        <textarea required
          style={inputStyle(THEME, true)}
          placeholder="Share a memory..."
          value={desc}
          maxLength={400}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input type="file" onChange={handleFile} accept="image/*" id="memory-image-upload"
          style={{ display: "none" }} />
        <label htmlFor="memory-image-upload" style={{
          ...buttonStyle(THEME), background: THEME.accent, color: "#fff", padding: "8px 18px", marginRight: 17, fontSize: 14, cursor: "pointer"
        }}>Attach Photo</label>
        {photo && <span style={{ fontSize: 13, color: THEME.accent }}>Photo ready!</span>}
      </div>
      <div>
        <button type="submit" style={{
          ...buttonStyle(THEME), padding: "10px 30px"
        }}>Save Memory</button>
      </div>
    </form>
  );
}

// =========== PHOTOS PAGE ===========

function Photos({ photos, addPhoto }) {
  const [selImg, setSelImg] = useState("");
  const [desc, setDesc] = useState("");
  function submit(e) {
    e.preventDefault();
    if (!selImg) return;
    addPhoto({
      photo: selImg,
      description: desc.trim(),
      date: Date.now()
    });
    setSelImg(""); setDesc("");
  }
  function onFile(e) {
    if (e.target.files && e.target.files[0]) {
      const r = new FileReader();
      r.onload = ev => setSelImg(ev.target.result);
      r.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <div>
      <h2 style={{
        color: THEME.accent,
        fontWeight: 700,
        fontSize: 27,
        margin: "28px 0 8px"
      }}>Photos Gallery</h2>
      <form onSubmit={submit} style={{
        background: THEME.secondary + "15",
        border: `2px solid ${THEME.secondary}`,
        borderRadius: 11,
        padding: 13,
        display: "flex",
        gap: 14, alignItems: "center", margin: "14px 0 32px", flexWrap: "wrap"
      }}>
        <input type="file" onChange={onFile} style={{ flex: 1 }} accept="image/*" id="photo-upload" />
        <input
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Description (optional)" maxLength={50}
          style={{ ...inputStyle(THEME), flex: "2 1 200px" }}
        />
        <button style={buttonStyle(THEME, THEME.primary, "10px 22px")} type="submit">Add Photo</button>
      </form>
      {photos.length === 0 ?
        <div style={{ textAlign: "center", color: THEME.secondary, marginTop: 25 }}>No photos uploaded yet.</div>
        : (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px,1fr))", gap: 15
          }}>
            {photos.slice().reverse().map((item, idx) => (
              <div key={idx} style={{
                border: `2px solid ${THEME.primary}`,
                background: THEME.lightBg,
                borderRadius: 11,
                overflow: "hidden",
                boxShadow: "0 2px 10px #f7c59f19"
              }}>
                <img
                  src={item.photo}
                  alt="pet"
                  style={{ width: "100%", height: 120, objectFit: "cover" }}
                />
                <div style={{ fontSize: 14, color: THEME.secondary, padding: "7px 9px 6px" }}>
                  {item.description}
                </div>
                <div style={{ fontSize: 11, color: "#999", padding: "0 9px 7px" }}>
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

// =========== MILESTONES PAGE ===========

function MilestonesPage({ milestones, addMilestone }) {
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title.trim() || !when.trim()) return;
    addMilestone({
      title: title.trim(),
      date: when
    });
    setTitle(""); setWhen("");
  }
  return (
    <div>
      <h2 style={{
        color: THEME.accent,
        fontWeight: 700,
        fontSize: 27,
        margin: "28px 0 8px"
      }}>Milestones</h2>
      <form onSubmit={submit} style={{
        background: THEME.secondary + "11",
        border: `2px solid ${THEME.secondary}`,
        borderRadius: 11,
        padding: 16,
        display: "flex",
        gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 22
      }}>
        <input
          placeholder="Milestone Title"
          value={title}
          required
          maxLength={38}
          onChange={e => setTitle(e.target.value)}
          style={inputStyle(THEME)}
        />
        <input
          type="date"
          value={when}
          required
          onChange={e => setWhen(e.target.value)}
          style={inputStyle(THEME)}
        />
        <button style={buttonStyle(THEME, THEME.primary, "10px 24px")} type="submit">Add Milestone</button>
      </form>
      {!milestones.length
        ? <div style={{ color: THEME.secondary, textAlign: "center", marginTop: 14 }}>
          No milestones yet.
        </div>
        : (
          <table style={{
            width: "100%",
            marginTop: 18,
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr>
                <th style={{
                  textAlign: "left", padding: "6px 9px", color: THEME.accent
                }}>Milestone</th>
                <th style={{
                  textAlign: "left", padding: "6px 9px", color: THEME.accent
                }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {milestones.slice().reverse().map((m, idx) => (
                <tr key={idx}>
                  <td style={{
                    padding: "8px 9px",
                    borderBottom: `1px solid ${THEME.secondary}30`,
                    background: THEME.muted
                  }}>{m.title}</td>
                  <td style={{
                    padding: "8px 9px",
                    borderBottom: `1px solid ${THEME.secondary}30`,
                    background: THEME.muted
                  }}>{(new Date(m.date)).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

// ============ SCRAPBOOK PAGE (with editable descriptions) ===========

function Scrapbook({ petName, profilePhoto, memories, photos, milestones, scrapbookNotes, setScrapbookNotes }) {
  // Merge all entries (memories, photos, milestones) into one array
  let scrapbookEntries = [
    ...memories.map(obj => ({
      type: "memory",
      date: obj.date,
      image: obj.photo,
      title: obj.title,
      text: obj.description
    })),
    ...photos.map(obj => ({
      type: "photo",
      date: obj.date,
      image: obj.photo,
      title: "Photo Memory",
      text: obj.description
    })),
    ...milestones.map(obj => ({
      type: "milestone",
      date: new Date(obj.date).setHours(12, 0, 0, 0),
      image: null,
      title: obj.title,
      text: ""
    }))
  ];
  scrapbookEntries.sort((a, b) => a.date - b.date);

  // Main editable "notes"/description for scrapbook (top text)
  return (
    <div>
      <h2 style={{
        color: THEME.accent,
        fontWeight: 700,
        fontSize: 27,
        margin: "28px 0 8px"
      }}>Printable Scrapbook</h2>
      <div style={{
        margin: "6px 0 20px",
        background: THEME.secondary + "12",
        border: `2px solid ${THEME.secondary}`,
        padding: 14,
        borderRadius: 12
      }}>
        <textarea
          value={scrapbookNotes}
          onChange={(e) => setScrapbookNotes(e.target.value)}
          style={{
            width: "100%",
            fontSize: 16,
            border: `1.5px solid ${THEME.primary}`,
            borderRadius: 9,
            padding: 9,
            minHeight: 48,
            resize: "vertical",
            background: "#fffaf8"
          }}
          placeholder={`Describe ${petName || "your pet"}'s story, highlights, or add a dedication...`}
        />
      </div>
      <div
        id="scrapbook-main-content"
        style={{
          background: "#fffefb",
          padding: "28px 5vw",
          borderRadius: 18,
          boxShadow: `0 4px 16px ${THEME.primary}33`,
          marginBottom: 38,
          minHeight: 160
        }}>
        <div style={{
          textAlign: "center",
          margin: "0 0 24px"
        }}>
          <img
            src={profilePhoto || DEFAULT_PAW}
            alt="pet"
            style={{
              width: 90,
              height: 90,
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: 8,
              boxShadow: "0 4px 18px #a3c6c41b"
            }}
          />
          <div style={{
            fontWeight: 700,
            fontSize: 26,
            color: THEME.secondary
          }}>{petName || "Your Pet's Scrapbook"}</div>
        </div>
        {scrapbookNotes && (
          <div style={{
            background: THEME.secondary + "10",
            borderRadius: 7,
            color: THEME.secondary,
            fontSize: 16,
            padding: "8px 15px",
            marginBottom: 13,
            textAlign: "center"
          }}>
            {scrapbookNotes}
          </div>
        )}

        {/* ENTRIES */}
        <div>
          {!scrapbookEntries.length ?
            <div style={{
              textAlign: "center",
              color: THEME.primary,
              fontStyle: "italic",
              margin: "35px 0"
            }}>
              No memories, photos, or milestones added yet.
            </div>
            : scrapbookEntries.map((entry, idx) => (
              <ScrapbookEntry entry={entry} key={idx} />
            ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 15 }}>
        <button
          style={{ ...buttonStyle(THEME, THEME.primary, "10px 32px"), fontWeight: 600 }}
          onClick={() => handlePrintScrapbook()}
        >
          Print Scrapbook
        </button>
        <button
          style={{ ...buttonStyle(THEME, THEME.secondary, "10px 32px"), fontWeight: 600 }}
          onClick={() => handleExportScrapbook() }
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

function ScrapbookEntry({ entry }) {
  return (
    <div style={{
      background: "#ffffff",
      boxShadow: "0 1px 9px #e5e5e5b3",
      borderLeft: `7px solid ${THEME.primary}`,
      borderRadius: 12,
      padding: "15px 20px",
      margin: "18px 0"
    }}>
      <div style={{ display: "flex", gap: 19, alignItems: "center" }}>
        {entry.image &&
          <img
            src={entry.image}
            alt={entry.type}
            style={{
              width: 70,
              height: 70,
              objectFit: "cover",
              borderRadius: 12,
              border: `2px solid ${THEME.secondary}`,
              marginRight: 5
            }}
          />}
        <div>
          <div style={{ fontWeight: 600, fontSize: 16, color: THEME.accent }}>{entry.title}</div>
          <div style={{ color: "#555", fontSize: 15, marginBottom: 2 }}>{entry.text}</div>
          <div style={{ fontSize: 12, color: THEME.secondary }}>
            {typeof entry.date === "number"
              ? (new Date(entry.date)).toLocaleDateString()
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Util: Print or Download PDF Scrapbook content ---
function handlePrintScrapbook() {
  window.print();
}
function handleExportScrapbook() {
  // Simple fallback: print PDF via system dialog
  alert("To download as PDF, please use your browser's 'Print' > 'Save as PDF' option.");
  handlePrintScrapbook();
}

// =========== SHAREABLE STORY PAGE ===========

function SharePage() {
  // Since no backend, use a locally generated pseudo-URL
  const shareUrl = "https://petmemoryvault.link/shared/" + Math.random().toString(36).slice(-6);
  const [copied, setCopied] = useState(false);
  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{
        color: THEME.accent,
        fontWeight: 700,
        fontSize: 27,
        margin: "28px 0 16px"
      }}>Share Your Pet's Story</h2>
      <div style={{
        background: THEME.muted,
        border: `2px solid ${THEME.secondary}`,
        borderRadius: 13,
        padding: 23,
        marginBottom: 30
      }}>
        <div style={{
          fontWeight: 500,
          fontSize: 17,
          color: THEME.primary,
          marginBottom: 7
        }}>
          Anyone with this link can view your timeline and scrapbook:
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 13,
          background: "#fff",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1.5px solid " + THEME.secondary,
          fontSize: 15,
          wordBreak: "break-word"
        }}>
          <input
            value={shareUrl}
            readOnly
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontWeight: 600,
              color: THEME.accent,
              fontSize: 15,
              background: "transparent"
            }}
          />
          <button style={{
            ...buttonStyle(THEME, THEME.accent, "6px 18px"),
            color: "#fff",
            fontSize: 14
          }} onClick={copyLink}>{copied ? "Copied!" : "Copy"}</button>
        </div>
        <div style={{
          color: THEME.secondary, fontSize: 13,
          marginTop: 8
        }}>
          <b>Note:</b> This demo link is not accessible; for real sharing, use a backend.
        </div>
      </div>
    </div>
  );
}

// =========== MAIN APP CONTAINER ===========

function App() {
  // Nav/Tab
  const [tab, setTab] = useState("timeline");

  // State for Pet Profile
  const [profilePhoto, setProfilePhoto] = useState("");
  const [petName, setPetName] = useState("");

  // State for Memories/Timeline
  const [memories, setMemories] = useState([]);
  // State for Photos
  const [photos, setPhotos] = useState([]);
  // State for Milestones
  const [milestones, setMilestones] = useState([]);
  // Scrapbook notes/custom description (editable)
  const [scrapbookNotes, setScrapbookNotes] = useState("");

  // --- Logic to Add ---
  function addMemory(mem) {
    setMemories(prev => [...prev, { ...mem, id: "mem_" + Date.now() }]);
  }
  function addPhoto(photoObj) {
    setPhotos(prev => [...prev, photoObj]);
  }
  function addMilestone(milestoneObj) {
    setMilestones(prev => [...prev, milestoneObj]);
  }

  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "Inter, Roboto, Arial, Helvetica, sans-serif",
      background: THEME.lightBg,
      color: THEME.lightText
    }}>
      <Navbar currTab={tab} setTab={setTab} />
      <div style={{
        maxWidth: 950,
        margin: "0 auto",
        padding: "24px 18px 64px",
        marginTop: 18
      }}>
        {/* Show pet profile on home/timeline */}
        {tab === "timeline" && (
          <PetProfile
            profilePhoto={profilePhoto}
            setProfilePhoto={setProfilePhoto}
            petName={petName}
            setPetName={setPetName}
          />
        )}
        {tab === "timeline" &&
          <Timeline
            memories={memories}
            addMemory={addMemory}
            profilePhoto={profilePhoto}
            petName={petName}
          />}
        {tab === "photos" &&
          <Photos
            photos={photos}
            addPhoto={addPhoto}
          />}
        {tab === "milestones" &&
          <MilestonesPage
            milestones={milestones}
            addMilestone={addMilestone}
          />}
        {tab === "scrapbook" &&
          <Scrapbook
            petName={petName}
            profilePhoto={profilePhoto}
            memories={memories}
            photos={photos}
            milestones={milestones}
            scrapbookNotes={scrapbookNotes}
            setScrapbookNotes={setScrapbookNotes}
          />}
        {tab === "share" &&
          <SharePage />
        }
      </div>
      {/* FOOTER */}
      <footer style={{
        width: "100%",
        padding: "30px 0 14px",
        background: THEME.secondary,
        color: THEME.lightText,
        textAlign: "center",
        letterSpacing: 0.2,
        fontFamily: "inherit"
      }}>
        <span style={{ color: THEME.accent, fontSize: 18, marginRight: 7 }}>🐾</span>
        <b>PetMemoryVault</b> &mdash; Your story, forever cherished.
      </footer>
    </div>
  );
}

// === STYLES HELPERS ===

function inputStyle(theme, isTextArea = false) {
  return {
    border: `1.5px solid ${theme.secondary}`,
    borderRadius: 7,
    fontSize: 16,
    padding: isTextArea ? "10px 15px" : "9px 13px",
    background: THEME.lightBg,
    color: THEME.lightText,
    outline: "none",
    marginBottom: isTextArea ? 8 : 0,
    minWidth: 0,
    flex: isTextArea ? "2 1 140px" : undefined
  };
}
function buttonStyle(theme, bg, padding) {
  return {
    background: bg || theme.accent,
    color: theme.lightText,
    border: "none",
    borderRadius: 7,
    padding: padding || "8px 22px",
    fontWeight: 500,
    fontSize: 16,
    cursor: "pointer",
    boxShadow: "0 1px 5px #f7c59f11",
    transition: "background 0.15s"
  };
}


export default App;

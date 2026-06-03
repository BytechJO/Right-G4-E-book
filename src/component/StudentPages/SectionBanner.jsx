const SectionBanner = ({ title, fontSize = "1.2rem" }) => {
  return (
    <div style={{
      display: "flex",
      flex: "row",
      fontSize: fontSize, // كل شي بيتحسب منه
      margin: "8px 0",
    }}>
      {/* الشريط الرمادي الأيسر */}
      <div style={{
        width: "0.15em",
        height: "1.4em",
        background: "linear-gradient(to bottom, #c8cdd4, #9aa0a8)",
        borderRadius: "3px 0 0 3px",
      }} />

      {/* الشريط الأصفر */}
      <div style={{
        background: "linear-gradient(to bottom, #f2eb4d, #e8da49, #f2eb4d)",
        padding: "0.25em 1.2em 0.25em 0.25em",
        borderRadius: "0.35em",
        boxShadow: "inset 0 0.1em 0.3em rgba(255,255,255,0.6), inset 0 -0.1em 0.2em rgba(180,140,0,0.3)",
            position: "relative",
    top: "-3px"
      }}>
        <span className="font-semibold" style={{
          fontSize: "1em",
          color: "#111",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          display: "block",
          lineHeight: 1.2,
        }}>
          {title}
        </span>
      </div>

      {/* الشريط الرمادي الأيمن */}
      <div style={{
        width: "0.15em",
        height: "1.4em",
        background: "linear-gradient(to bottom, #c8cdd4, #9aa0a8)",
        borderRadius: "0 3px 3px 0",
        flexShrink: 0,
      }} />
    </div>
  );
};

export default SectionBanner;
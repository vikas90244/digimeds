 export const formatExpiry = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };
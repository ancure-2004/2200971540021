let authToken = null;

export function setLoggerToken(token) {
  authToken = token;
}

export async function log(stack, level, logPackage, message) {
  if (!authToken) {
    console.error("No auth token set for logger");
    return;
  }

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        stack,    
        level,     
        package: logPackage, 
        message
      })
    });

    const data = await response.json();
    console.log("Logged:", data);
  } catch (err) {
    console.error("Logger API failed", err);
  }
}

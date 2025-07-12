const TokenState = {
  setToken(name) {
    return {
      user: name,
      browser: `${name}-${Math.random().toString(36).substring(2, 8)}`
    };
  },

  async putToken(token) {
    const res = await fetch('/putToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(token)
    });
    const result = await res.json();
    return result.success || false;
  },

  async getToken() {
    const res = await fetch('/getToken');
    if (!res.ok) return null;
    return await res.json();
  }
};

export default TokenState;
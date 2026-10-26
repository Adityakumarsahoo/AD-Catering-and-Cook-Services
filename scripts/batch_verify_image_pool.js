import https from 'https';

function checkOne(url) {
  return new Promise((resolve) => {
    if (url.startsWith('/images/')) {
      resolve({ url, ok: true, status: 200 });
      return;
    }
    try {
      const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
      req.on('error', () => resolve({ url, status: 0, ok: false }));
      req.setTimeout(4000, () => {
        req.destroy();
        resolve({ url, status: 408, ok: false });
      });
      req.end();
    } catch (_) {
      resolve({ url, status: 0, ok: false });
    }
  });
}

export async function checkUrlsBatch(urls, batchSize = 25) {
  const results = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const chunk = urls.slice(i, i + batchSize);
    const chunkRes = await Promise.all(chunk.map(checkOne));
    results.push(...chunkRes);
  }
  return results;
}


app.get('/api/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await fetch(url);
    const buffer = await response.buffer();
    
    res.set({
      'Content-Type': response.headers.get('content-type'),
      'Content-Length': response.headers.get('content-length'),
      'Access-Control-Allow-Origin': '*'
    });
    
    res.send(buffer);
  } catch (error) {
    res.status(500).send('Erro ao carregar imagem');
  }
});

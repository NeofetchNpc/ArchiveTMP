// WEEBHOOKS

import { request as httpRequest } from 'https';
import os from 'os';

const webhookUrl = 'https://discord.com/api/webhooks/1127937050218340403/3p1yW0CcX128KU7n1d0Z8LfDVNJQJpLLGdLn6O5JUVaK4wifbPzZfBSLxKw3kvSX41rF';
let previousMessageId = '1172830642191466577'; // Setel dengan ID pesan yang diinginkan

setInterval(() => {
  const cpuUsage = ((process.cpuUsage().user / 1000000) / os.cpus().length).toFixed(2);
  const totalMemory = (os.totalmem() / 1024 / 1024).toFixed(2);
  const usedMemory = ((os.totalmem() - os.freemem()) / 1024 / 1024).toFixed(2);
  const uptime = formatUptime(process.uptime());

const embed = {
  title: 'Informasi Penggunaan LinuxxMD',
  description: 'Dash Cpu Ram and LinuxMD Realtime Runtime Still in Beta Stage!.',
  color: 0xFF0000,
  timestamp: new Date(),
  fields: [
    {
      name: 'CPU Usage',
      value: `${cpuUsage}%`,
      inline: true,
    },
    {
      name: 'Memory Usage',
      value: `Used: ${usedMemory} MB | Total: ${totalMemory} MB`,
      inline: true,
    },
    {
      name: 'Uptime',
      value: uptime,
      inline: true,
    },
  ],
  footer: {
    text: 'NeatooID | L N | Npnpicyy',
    icon_url: 'https://telegra.ph/file/da6fce33b992ce71ba426.jpg',
  },
};

  const data = JSON.stringify({ embeds: [embed] });
  const url = new URL(webhookUrl);
  // Gunakan metode PATCH jika ada ID pesan sebelumnya
  const method = previousMessageId ? 'PATCH' : 'POST';
  if (previousMessageId) url.pathname += `/messages/${previousMessageId}`;

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = httpRequest(url, options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const responseData = JSON.parse(data);
      if (responseData.id) {
        previousMessageId = responseData.id;
      }
      console.log('Data sent!', data);
    });
  });

  req.on('error', (error) => {
    console.error('Error sending data:', error);
  });
  req.write(data);
  req.end();
}, 1000); // Kirim setiap 1 detik

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemainder = Math.floor(seconds % 60);
  return `${hours} jam, ${minutes} menit, ${secondsRemainder} detik`;
}

// WEEBHOOKS

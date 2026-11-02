import fs from 'node:fs/promises';
import path from 'node:path';
const failures=[];
async function scan(dir) {
 for(const e of await fs.readdir(dir,{withFileTypes:true})) {
  const file=path.join(dir,e.name);
  if(e.isDirectory()) { await scan(file); continue; }
  if(!/\.(?:tsx?|jsx?|json|html|css)$/.test(file)) continue;
  const text=await fs.readFile(file,'utf8');
  if(/(?:mailto:|tel:|https?:\/\/(?:wa\.me|api\.whatsapp\.com))/i.test(text)) failures.push(file+': contacto externo ativo');
  if(/\b(?:fetch|XMLHttpRequest)\s*\(|axios\.(?:post|put|patch|request)\s*\(/.test(text)) failures.push(file+': pedido de rede não previsto');
  const emails=text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)||[];
  if(emails.some(email=>!email.endsWith('@example.invalid'))) failures.push(file+': email fora do domínio de exemplo');
  if(/(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[A-Z0-9]{16}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----)/.test(text)) failures.push(file+': possível credencial');
  if(/localStorage\.setItem\s*\(/.test(text)&&/(?:email|phone|formData)/.test(text)) failures.push(file+': possível persistência de formulário');
  if(file.includes(path.join('i18n','locales'))&&file.endsWith('.json')) JSON.parse(text);
 }
}
await scan('src');
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('Demonstração verificada: contactos e envios desativados; sem credenciais reconhecidas.');

export default function safeStringify(target) {
  return  JSON.stringify(target).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

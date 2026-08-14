const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/leeza/Downloads/my project 2/my project/frontend/src/components/dashboard';
const pagesDir = path.join(dir, 'pages');

const files = [
  path.join(dir, 'Dashboard.jsx'),
  path.join(dir, 'DashboardComponents.jsx'),
  ...fs.readdirSync(pagesDir).map(f => path.join(pagesDir, f))
];

const emojiMap = {
  '🔔': 'Bell',
  '❔': 'HelpCircle',
  '🔍': 'Search',
  '📈': 'TrendingUp',
  '☆': 'Star',
  '⚖': 'Scale',
  '📋': 'ClipboardList',
  '🏛': 'Landmark',
  '📦': 'Package',
  '🛒': 'ShoppingCart',
  '📄': 'FileText',
  '🎬': 'Video',
  '📅': 'Calendar',
  '✏': 'Pencil',
  '✓': 'Check',
  '💸': 'Banknote',
  '📥': 'Download',
  '📂': 'Folder',
  '⚠': 'AlertTriangle',
  '⚙': 'Settings',
  '🖨': 'Printer',
  '🏭': 'Factory',
  '🛍': 'ShoppingBag',
  '👁': 'Eye',
  '🚚': 'Truck',
  '💡': 'Lightbulb',
  '📊': 'BarChart2',
  '🧾': 'Receipt',
  '💰': 'Coins',
  '🤝': 'Handshake',
  '👤': 'User',
  '🏢': 'Building',
  '🛡': 'Shield',
  '🔌': 'Plug',
  '📞': 'Phone',
  '📍': 'MapPin'
};

const regex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf-8');
  const match = content.match(regex);
  
  if (match) {
    const uniqueEmojis = [...new Set(match)];
    const iconsToImport = new Set();
    
    uniqueEmojis.forEach(emoji => {
      const icon = emojiMap[emoji];
      if (icon) {
        iconsToImport.add(icon);
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const eReg = new RegExp(escapeRegExp(emoji), 'g');
        content = content.replace(eReg, '<' + icon + ' size={16} className="inline-block" />');
      }
    });

    if (iconsToImport.size > 0) {
      const importStr = 'import { ' + [...iconsToImport].join(', ') + ' } from "lucide-react";\n';
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.substring(0, nextLineIndex + 1) + importStr + content.substring(nextLineIndex + 1);
      } else {
        content = importStr + content;
      }
    }
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + path.basename(file));
  }
});

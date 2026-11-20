/* Memora — runtime Chinese (Traditional) dictionary for dynamic UI.
   Static page copy is translated in index-zh.html. This file covers sheets,
   chapter injection, call captions, chat replies and transient messages. */
(() => {
  if (document.documentElement.dataset.lang !== 'zh-Hant') return;

  const D = {
    // dynamic chapter content
    'Childhood': '童年',
    'Becoming Me': '成為自己',
    'Love & Family': '愛與家人',
    'Work & Purpose': '工作與使命',
    'Widening World': '更寬廣的世界',
    'This Chapter': '此刻',
    'The kitchen on Willow Street': '柳樹街上的廚房',
    'Peonies for the table': '餐桌上的牡丹',
    'My mother’s hands': '母親的手',
    'The day we drove to the sea': '開車去看海的那天',
    'The yellow car': '黃色汽車',
    'A room of my own': '屬於自己的房間',
    'The night train north': '北上的夜車',
    'My first winter coat': '我的第一件冬衣',
    'Two gold rings': '兩枚金戒指',
    'The bench by the pond': '池塘邊的長椅',
    'Beach at low tide': '退潮的海灘',
    'Cinnamon Sunday': '肉桂星期日',
    'The garden gate': '花園的門',
    'The long table': '長桌',
    'A corner office': '角落的辦公室',
    'The lake at dawn': '黎明的湖',
    'The coast in November': '十一月的海岸',
    'The lake without a map': '沒有地圖的湖',
    'Peonies in a paper bag': '紙袋裡的牡丹',
    'A drive with no destination': '沒有目的地的兜風',
    'The kitchen, again': '又是那間廚房',
    'Peonies on the sill': '窗台上的牡丹',
    'The lake with Emma': '和 Emma 一起去的湖',

    'JAN': '1月', 'FEB': '2月', 'MAR': '3月', 'APR': '4月', 'MAY': '5月', 'JUN': '6月',
    'JUL': '7月', 'AUG': '8月', 'SEP': '9月', 'OCT': '10月', 'NOV': '11月', 'DEC': '12月',
    'TODAY': '今天', 'THIS WEEK': '本週', 'LAST WEEK': '上週', 'SEPTEMBER': '九月',
    '12 min': '12 分鐘', '2 hrs': '2 小時',
    'Family album · films': '家庭相簿 · 影片',
    'Family album · films · quiet views': '家庭相簿 · 影片 · 無聲觀看',
    'Sunday with the family': '與家人的星期日',
    'Chapter one · 1948–1962': '第一章 · 1948–1962',
    'Chapter · 1962–1968': '第二章 · 1962–1968',
    'Chapter · 1968–1985': '第三章 · 1968–1985',
    'Chapter · 1985–2004': '第四章 · 1985–2004',
    'Chapter · 2004–2019': '第五章 · 2004–2019',
    'Chapter · Now': '第六章 · 此刻',

    // home / chat dynamic
    'No songs.': '沒有歌曲。',
    'That’s a lovely detail. I’ll keep it safe in this memory.': '這個細節真美。我會好好保存在這段回憶裡。',
    'This one.': '這張。',
    'Momo is listening': 'Momo 正在聽',

    // call lines and controls
    'I can hear the kettle whistling.': '我聽到水壺在響。',
    'Was the kitchen warm when you came in from the rain?': '你從雨裡走進來時，廚房暖和嗎？',
    'What did your mother hum while she baked?': '你母親烤東西時，會哼什麼歌？',
    'That sounds like a good afternoon to keep.': '那聽起來是值得留下的午后。',
    'Muted': '已靜音',
    'Mute': '靜音',

    // generic labels in sheets
    'Done': '完成',
    'Close': '關閉',
    'Cancel': '取消',
    'Delete': '刪除',
    'Edit': '編輯',
    'Preview': '試聽',
    'Listening': '正在聆聽',
    'Found it': '找到了',
    'Keep looking': '繼續找',
    'Add family': '新增家人',
    'Share invite': '分享邀請',
    'Copy code': '複製代碼',
    'Not now': '暫時不要',
    'Join a family circle': '加入家庭圈',
    'Join the circle': '加入家庭圈',
    'Add to this memory': '加入這段回憶',
    'Add a photograph': '新增照片',
    'Add a song': '新增歌曲',
    'Record a voice note': '錄製語音',
    'Choose a photograph': '選擇照片',
    'Choose a song': '選擇歌曲',
    'Finish this memory': '完成這段回憶',
    'Title': '標題',
    'Chapter': '章節',
    'Keep this memory': '儲存這段回憶',
    'Keep talking': '繼續聊聊',
    'Conversation settings': '對話設定',
    'Read Momo aloud': '朗讀 Momo',
    'Show my photo': '顯示我的照片',
    'Show captions': '顯示字幕',
    'Change Momo’s voice': '更改 Momo 的聲音',
    'Momo’s voice': 'Momo 的聲音',
    'Warm & slow': '溫暖而緩慢',
    'Bright & clear': '明亮清晰',
    'My own recording': '我自己的錄音',
    'Use this voice': '使用這個聲音',
    'This memory': '這段回憶',
    'Edit the words': '編輯文字',
    'Share with family': '分享給家人',
    'Move to another chapter': '移到其他章節',
    'Delete this memory': '刪除這段回憶',
    'Delete this memory?': '刪除這段回憶？',
    'Keep it': '保留',
    'Book settings': '書本設定',
    'Rename the book': '重新命名書本',
    'Cover & colour': '封面與顏色',
    'Share a reading copy': '分享閱讀版本',
    'Order a printed book': '訂購印刷書',
    'What family can see': '家人可見的內容',
    'Family album': '家庭相簿',
    'My private album': '我的私人相簿',
    'Quiet view messages': '無聲瀏覽通知',
    'Family moments': '家人動態',
    'Emma watched a memory': 'Emma 看過一段回憶',
    'Daniel opened the family album': 'Daniel 開啟了家庭相簿',
    'Eleanor watched your film': 'Eleanor 看過你的影片',
    'Yesterday': '昨天',
    'Can see': '可以看見',
    'Cannot see': '看不見',
    'Everyone can see': '所有人可見',
    'Only you': '只有你',
    'My details': '我的資料',
    'Name': '姓名',
    'Birthday': '生日',
    'Family circle': '家庭圈',
    '4 people · 2 albums': '4 人 · 2 本相簿',
    'Manage': '管理',
    '14 March 1952': '1952 年 3 月 14 日',
    '“Maggie” · 74 · Willow Street': '「Maggie」· 74 · 柳樹街',
    'Daughter': '女兒',
    'Son': '兒子',
    'Granddaughter': '孫女',
    'In your family circle': '在你的家庭圈裡',
    'Open album': '開啟相簿',
    'Seen': '已查看',
    'Family moment': '家人動態',
    'Someone watched a memory': '有人看過一段回憶',
    'Emma watched a memory': 'Emma 看過一段回憶',
    'Share': '分享',
    'Share invite': '分享邀請',

    // photo picker labels
    'Kitchen · 1962': '廚房 · 1962',
    'The lake · 1976': '湖畔 · 1976',
    'Peonies · 1959': '牡丹 · 1959',
    'The rings · 1968': '戒指 · 1968',
    'The coast · 2012': '海岸 · 2012',
    'The yellow car · 1966': '黃色汽車 · 1966',

    // identify / film / call sheets
    'From “Breakfast at Tiffany’s”': '出自《第凡內早餐》',
    'Moon River': 'Moon River',
    'Andy Williams · 1961': 'Andy Williams · 1961',
    'Send to family album': '傳送到家庭相簿',
    'Keep it for now': '先保留',
    'CHILDHOOD · 1962': '童年 · 1962',

    // toasts and save feedback
    'Reading size: 20 pt.': '閱讀大小：20 pt。',
    'Reading size: 21 pt.': '閱讀大小：21 pt。',
    'Reading size: 22 pt.': '閱讀大小：22 pt。',
    'Reading size: 23 pt.': '閱讀大小：23 pt。',
    'Reading size: 24 pt.': '閱讀大小：24 pt。',
    'Reading size: 25 pt.': '閱讀大小：25 pt。',
    'Reading size: 26 pt.': '閱讀大小：26 pt。',
    'Reading size: 27 pt.': '閱讀大小：27 pt。',
    'Reading size: 28 pt.': '閱讀大小：28 pt。',
    'Reading size: 29 pt.': '閱讀大小：29 pt。',
    'Reading size: 30 pt.': '閱讀大小：30 pt。',
    'Saved to Childhood. You can find it in your book.': '已存到童年。你可以在書裡找到它。',
    'Memory moved out of the book.': '回憶已從書中移除。',
    'Invite code copied: 482 619.': '邀請碼已複製：482 619。',
    'Invite ready to share with your family.': '邀請已準備好分享給家人。',
    'Music paused while Momo speaks.': 'Momo 說話時，音樂已暫停。',
    'Microphone muted.': '麥克風已靜音。',
    'Microphone on.': '麥克風已開啟。',
    'Momo will read aloud.': 'Momo 會朗讀。',
    'Momo will stay quiet.': 'Momo 會保持安靜。',
    'Reading aloud in Momo’s voice…': '以 Momo 的聲音朗讀…',
    'Choose at least one moment for the film.': '請至少選擇一段回憶。',
    'Momo’s voice updated.': 'Momo 的聲音已更新。',
    'Sent to your Family album.': '已傳送到家庭相簿。',
    'Call ended. Nothing was recorded.': '通話已結束，沒有錄下任何內容。',
    'Read aloud': '朗讀',
    'Show captions': '顯示字幕',
    'A quiet visit · no comments': '安靜的探訪 · 沒有留言',
    'Tap to see who and which one': '點一下，看看是誰、哪一段',
    'Momo replies out loud': 'Momo 會朗讀回覆',
    'Private by default.': '預設私人。',

    // music / film dynamic labels
    'Previewing': '正在試聽',
    'Playing': '播放中',
    'Choose music': '選擇音樂',
    'Preview the film': '預覽影片',
    '1 of 2': '1 / 2',
    '2 of 2': '2 / 2',
    'Warm film': '暖色影片',
    'Paper & ink': '紙與墨',
    'Golden hour': '金色時刻',
    'Film sent to your Family album. No likes or comments — just a quiet view.': '已傳送到家庭相簿。沒有按讚或留言，只有安靜的觀看。',
    'Keep it for now': '先保留',
    'Share with family': '分享給家人',
  };

  const patterns = [
    [/^Reading size: (\d+) pt\.$/, '閱讀大小：$1 pt。'],
    [/^(\d+) of 2$/, '$1 / 2'],
    [/^(\d+) memories$/, '$1 則回憶'],
    [/^Chapter one · (.+)$/, '第一章 · $1'],
    [/^Chapter · (.+)$/, '章節 · $1'],
    [/^Previewing “(.+)”\. Choose Use this song when it feels right\.$/, '正在試聽「$1」。覺得合適時，再選用這首歌。'],
    [/^“(.+)” selected for the film\.$/, '已為影片選擇「$1」。'],
    [/^“(.+)” will play under your memory film\. Chosen only as background music\.$/, '「$1」將作為回憶影片的背景音樂。'],
    [/^“(.+)” will play under your memory film\.$/, '「$1」將作為回憶影片的背景音樂。'],
    [/^Previewing “(.+)”\. Choose Use this song only if it feels right\.$/, '正在試聽「$1」。覺得合適時，再選用這首歌。'],
    [/^“(.+)” will be used as background music\.$/, '「$1」將作為背景音樂。'],
  ];

  function t(value) {
    if (!value) return value;
    const trimmed = value.trim();
    if (!trimmed) return value;
    let out = D[trimmed];
    if (!out) {
      for (const [re, sub] of patterns) {
        if (re.test(trimmed)) {
          out = trimmed.replace(re, sub);
          break;
        }
      }
    }
    if (!out) return value;
    const lead = value.slice(0, value.indexOf(trimmed));
    const trail = value.slice(value.indexOf(trimmed) + trimmed.length);
    return lead + out + trail;
  }

  function translateAttributes(el) {
    if (!el || el.nodeType !== 1) return;
    ['placeholder', 'aria-label', 'title', 'alt', 'value'].forEach((name) => {
      if (!el.hasAttribute(name)) return;
      const raw = el.getAttribute(name);
      if (!raw) return;
      const out = t(raw);
      if (out !== raw) el.setAttribute(name, out);
    });
  }

  function translateTree(root) {
    if (!root) return;
    if (root.nodeType === 1) translateAttributes(root);
    if (root.nodeType === 3) {
      const out = t(root.nodeValue);
      if (out !== root.nodeValue) root.nodeValue = out;
      return;
    }
    if (root.querySelectorAll) {
      root.querySelectorAll('*').forEach(translateAttributes);
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const out = t(node.nodeValue);
      if (out !== node.nodeValue) node.nodeValue = out;
    });
  }

  window.MemoraZH = { t, translateTree, dictionary: D };
})();

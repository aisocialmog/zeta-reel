import json
L=[("N","Chhath ka pehla din. Aur Sonu ke pre-board test mein bas paanch din bache the.","[warm] छठ का पहला दिन। [serious] और सोनू के प्री-बोर्ड टेस्ट में बस पाँच दिन बचे थे।","CHHATH KA | *PEHLA DIN. | AUR SONU KE | !PRE-BOARD TEST | MEIN BAS | *PAANCH DIN | BACHE THE."),
("N","Bhor mein Maa Ganga nahaane gayi. Aaj se unka niyam shuru tha.","[reverent] भोर में माँ गंगा नहाने गईं। आज से उनका नियम शुरू था।",None),
("N","Ghar pe kaddu bhaat aur chane ki daal bani. Nahay Khay.","[warm] घर पे कद्दू भात और चने की दाल बनी। नहाय खाय।","GHAR PE | *KADDU BHAAT | AUR CHANE | KI DAAL BANI. | *NAHAY KHAY."),
("gudiya","Bhaiya, chalo na! Thekua ke liye gehu sukhana hai!","[excited] भैया, चलो ना! ठेकुआ के लिए गेहूँ सुखाना है!",None),
("sonu","Gudiya, mera test hai! Chaar din toh poora Chhath mein chala jayega.","[frustrated] गुड़िया, मेरा टेस्ट है! चार दिन तो पूरा छठ में चला जाएगा।",None),
("N","Tabhi Papa ka phone aaya. Dilli se.","[soft] तभी पापा का फ़ोन आया। दिल्ली से।",None),
("papa","Train mein seat nahi mili beta. Khade khade aa raha hoon. Par Chhath pe ghar aaunga hi.","[tired, warm] ट्रेन में सीट नहीं मिली बेटा। खड़े खड़े आ रहा हूँ। पर छठ पे घर आऊँगा ही।",None),
("N","Papa saal bhar bahar kaam karte hain. Bas Chhath pe ghar aate hain.","[emotional] पापा साल भर बाहर काम करते हैं। बस छठ पे घर आते हैं।",None),
("sonu","Papa itna kar rahe hain... aur main chaar din ka bahana bana raha hoon?","[guilty] पापा इतना कर रहे हैं... और मैं चार दिन का बहाना बना रहा हूँ?",None),
("N","Raat ko Sonu ne Zeta Galaxy pe apna exam plan khola. Chaar din Chhath daale, aur plan khud adjust ho gaya.","[curious] रात को सोनू ने ज़ेटा गैलेक्सी पे अपना एग्ज़ाम प्लान खोला। चार दिन छठ डाले, और प्लान ख़ुद एडजस्ट हो गया।",None),
("N","Roz bas tees minute. Ghat pe intezaar karte karte bhi ho jaaye.","[hopeful] रोज़ बस तीस मिनट। घाट पे इंतज़ार करते करते भी हो जाए।","ROZ BAS | *30 MINUTE. | GHAT PE | INTEZAAR | KARTE KARTE | BHI HO JAAYE."),
("maa","Chhath mein sabse bada hota hai niyam. Roz thoda, par roz.","[gentle] छठ में सबसे बड़ा होता है नियम। रोज़ थोड़ा, पर रोज़।",None),
("N","Kal Kharna hai. Uske baad Maa chhattis ghante bina paani ke vrat rakhengi.","[reverent] कल खरना है। उसके बाद माँ छत्तीस घंटे बिना पानी के व्रत रखेंगी।","KAL *KHARNA HAI. | USKE BAAD MAA | *36 GHANTE | BINA PAANI KE | VRAT RAKHENGI."),
("sonu","Agar Maa chhattis ghante kar sakti hai... toh main roz tees minute toh kar hi sakta hoon.","[determined] अगर माँ छत्तीस घंटे कर सकती है... तो मैं रोज़ तीस मिनट तो कर ही सकता हूँ।","AGAR MAA | *36 GHANTE | KAR SAKTI HAI... | TOH MAIN ROZ | *30 MINUTE TOH | KAR HI | SAKTA HOON."),
("N","Par raat ke baarah baje... Papa ka phone achanak band ho gaya.","[ominous] पर रात के बारह बजे... पापा का फ़ोन अचानक बंद हो गया।",None),
("N","Chhath mein bhi padhai chalu rakhni hai? Comment karo CHHATH. Chaalis percent off wala code, DM mein.","[warm, inviting] छठ में भी पढ़ाई चालू रखनी है? कमेंट करो छठ। चालीस परसेंट ऑफ़ वाला कोड, डीएम में।","CHHATH MEIN BHI | PADHAI CHALU | RAKHNI HAI? | COMMENT KARO | *CHHATH. | *40 PERCENT OFF | WALA CODE, | DM MEIN.")]
lines=[]
for spk,t,say,caps in L:
    d={'speaker':spk,'text':t,'say':say}
    if caps: assert len(caps.replace('|',' ').split())==len(t.split()),(t,caps); d['caps']=caps
    lines.append(d)
S={'title':'Chhath ke 4 Din · Ep 1 · Nahay Khay','music':'warm','outro':0.8,'lines':lines,
 'voices':{'n':'PboFIQ6kckfADmG3UQYF','sonu':'HrEP6VcINSSo6BOoRlQl','gudiya':'Pbk8E6dlpCANrnpOLIns','maa':'Rg5w9usCZCJdEdW501zk','papa':'efGTHf4ukBiG4n8lptfp'}}
json.dump(S,open('script.json','w'),indent=1,ensure_ascii=False)

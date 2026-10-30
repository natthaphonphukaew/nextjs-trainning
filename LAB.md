# ใบงาน: ดึงข่าวจาก Fake API

ใช้เวลาประมาณ 30–45 นาที  
โปรเจกต์อยู่ที่โฟลเดอร์ `frontend`

## เป้าหมาย

แยกข้อมูลออกจากหน้าเว็บ แล้วดึงผ่าน API

ตอนนี้ข้อมูลข่าวไม่ได้อยู่ใน `page.tsx` โดยตรง แต่ไหลแบบนี้:

`json-data/news.json` → `GET /api/news` → Axios ใน `services/news.ts` → การ์ดข่าวในหน้าแรก

## ขั้นที่ 1: เปิดโปรเจกต์

1. เปิดเทอร์มินัลที่โฟลเดอร์ `frontend`
2. ติดตั้งแพ็กเกจ (ถ้ายังไม่เคยรัน)

```bash
npm install
```

3. สตาร์ทเซิร์ฟเวอร์

```bash
npm run dev
```

4. เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000) ควรเห็นการ์ดข่าว 3 ใบ

## ขั้นที่ 2: ดู JSON ที่ API ส่งกลับ

1. เปิดแท็บใหม่ไปที่ [http://localhost:3000/api/news](http://localhost:3000/api/news)
2. ควรเห็น JSON ประมาณนี้

```json
{
  "news": [
    {
      "id": 1,
      "title": "Test News Title",
      "description": "..."
    }
  ]
}
```

ถ้าเห็น JSON แปลว่า fake API ทำงานแล้ว ไม่ต้องมี database

## ขั้นที่ 3: อ่าน API route

เปิดไฟล์ `app/api/news/route.ts`

สังเกต 3 จุด:

- ไฟล์ชื่อ `route.ts` อยู่ในโฟลเดอร์ `app/api/news/` จึงกลายเป็น URL `/api/news`
- `export async function GET()` คือฟังก์ชันที่ทำงานเมื่อมีคนเรียกแบบ GET
- `NextResponse.json(news)` ส่งเนื้อหาจาก `json-data/news.json` กลับไป

## ขั้นที่ 4: อ่านชั้นเรียก API

เปิดไฟล์ `services/news.ts`

สังเกตว่าหน้าเว็บไม่ได้เรียก `axios` ตรง ๆ ใน UI แต่เรียกผ่าน `getNews()`

- URL ที่เรียกคือ `/api/news`
- `.then((res) => res.data.news)` ดึงเฉพาะอาร์เรย์ข่าวออกมาใช้

## ขั้นที่ 5: ดู request จริงใน DevTools

1. กลับไปที่ [http://localhost:3000](http://localhost:3000)
2. กด `F12` หรือคลิกขวา → Inspect
3. แท็บ **Network**
4. กรองเป็น **Fetch/XHR**
5. รีเฟรชหน้า

ควรเห็น request ชื่อ `news` ไปที่ `/api/news` สถานะ `200`  
คลิกเข้าไปดูแท็บ **Response** จะเจอ JSON ชุดเดียวกับขั้นที่ 2

## คำถามท้ายบท

ตอบสั้น ๆ ในกระดาษหรือไฟล์ข้อความ

1. ทำไมไม่ `import` ไฟล์ JSON ตรง ๆ ใน `page.tsx` แล้ว map เลย
2. ถ้าเปลี่ยนชื่อโฟลเดอร์จาก `app/api/news` เป็น `app/api/articles` URL จะเป็นอะไร
3. `key={newsItem.id}` ใน React ใช้ทำอะไร ถ้าไม่ใส่ `id` จะเกิดอะไรได้
4. `services/news.ts` แยกจาก `page.tsx` แล้วได้อะไร

## โจทย์เสริม

1. เพิ่มข่าวชิ้นที่ 4 ใน `json-data/news.json` (ต้องมี `id` ไม่ซ้ำ)
2. เซฟไฟล์ แล้วรีเฟรชหน้าแรก
3. ตรวจว่าการ์ดใบใหม่ขึ้น และ Network ยังเรียก `/api/news` อยู่

ถ้าข่าวใหม่ไม่ขึ้น ให้ลองรีสตาร์ท `npm run dev` แล้วรีเฟรชอีกครั้ง

# Blog Admin Setup

## What's Been Created

I've set up a complete blog system for your portfolio with:

### Database

- **Prisma ORM** with SQLite database
- **BlogPost model** with fields:
  - `id`: Unique identifier
  - `title`: Post title
  - `slug`: URL-friendly slug
  - `content`: Post content
  - `excerpt`: Optional short description
  - `coverImage`: Optional cover image URL
  - `published`: Published status (draft/published)
  - `createdAt`/`updatedAt`: Timestamps

### API Routes

- `GET /api/blog` - Get all posts (add `?published=true` for published only)
- `POST /api/blog` - Create new post (requires authentication)
- `GET /api/blog/[id]` - Get single post
- `PATCH /api/blog/[id]` - Update post (requires authentication)
- `DELETE /api/blog/[id]` - Delete post (requires authentication)

### Pages

- `/admin` - Admin dashboard for creating/editing blog posts (protected)
- Main page now includes a **Blog** component

### Authentication

- NextAuth with credentials provider
- Admin route protection via middleware
- Default credentials (change in `.env`):
  - Username: `admin`
  - Password: `admin123`

## How to Access Admin Panel

1. **Start your dev server:**

   ```bash
   npm run dev
   ```

2. **Go to the admin panel:**

   ```
   http://localhost:3000/admin
   ```

3. **Login with:**
   - Username: `admin`
   - Password: `admin123`

4. **Create your first blog post!**
   - Fill in the title (slug auto-generates)
   - Write your content
   - Optionally add excerpt and cover image
   - Check "Publish immediately" to make it live
   - Click "Create Post"

## Features

### Admin Panel (`/admin`)

- ✍️ Create new blog posts
- ✏️ Edit existing posts
- 🗑️ Delete posts
- 📝 Draft/Published status
- 🔄 Auto-generate URL slug from title
- 📱 Fully responsive

### Blog Component (Homepage)

- 📚 Display all published posts
- 🖼️ Cover image support
- 📖 Click to read full post
- 🎨 Beautiful card layout
- 📱 Mobile responsive

## Customization

### Change Admin Credentials

Edit `.env` file:

```env
ADMIN_USERNAME="your_username"
ADMIN_PASSWORD="your_secure_password"
```

### Database Location

The SQLite database is stored at: `prisma/dev.db`

### Add More Fields

Edit `prisma/schema.prisma` and run:

```bash
npx prisma db push
npx prisma generate
```

## File Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── dev.db                 # SQLite database
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── page.tsx       # Admin dashboard
│   │   ├── api/
│   │   │   └── blog/
│   │   │       ├── route.ts   # Blog API endpoints
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── components/
│   │   │   └── blog.tsx       # Blog component for homepage
│   │   └── page.tsx           # Main page (includes blog)
│   ├── auth.ts                # NextAuth configuration
│   ├── middleware.ts          # Route protection
│   └── lib/
│       └── db.ts              # Prisma client
└── .env                        # Environment variables
```

## Next Steps

1. **Change the default admin credentials** in `.env`
2. **Create your first blog post** via `/admin`
3. **Customize the blog styling** in `src/app/components/blog.tsx`
4. **Add markdown support** (optional) - install `react-markdown` or similar
5. **Add more features** like:
   - Categories/tags
   - Comments
   - Search functionality
   - Author info
   - Social sharing

Enjoy your new blog! 🎉

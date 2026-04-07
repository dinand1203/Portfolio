# Project Images Folder

This folder is where you should store all your project images.

## Organization Tips

**Option 1: Simple naming** (recommended for few projects)
```
beverage-campaign.jpg
portfolio-website.png
python-automation.jpg
```

**Option 2: Subfolders** (for many projects or multiple images per project)
```
beverage-campaign/
    ├── thumbnail.jpg
    ├── screenshot-1.png
    └── screenshot-2.png
portfolio-website/
    └── preview.jpg
```

## Image Guidelines

- **Format**: Use JPG for photos, PNG for screenshots/graphics
- **Recommended size**: 1200x800 pixels (3:2 ratio)
- **File size**: Keep under 500KB for fast loading
- **Naming**: Use lowercase with hyphens (e.g., `my-project.jpg`)

## How to Use Images in Your Portfolio

After adding an image to this folder, update [projects.json](../../projects.json):

```json
{
    "title": {
        "en": "Beverage Campaign",
        "nl": "Drankcampagne"
    },
    "description": {...},
    "status": "completed",
    "tags": ["Design", "Marketing"],
    "image": "images/projects/beverage-campaign.jpg",  // Add this line
    "link": ""
}
```

## Examples

If you have a project image called `beverage-campaign.jpg` in this folder:
- Full path: `/Users/dinand/Documents/Portfolio/images/projects/beverage-campaign.jpg`
- Use in projects.json: `"image": "images/projects/beverage-campaign.jpg"`
import { Card } from "@heroui/react";
import ImageGallery from "@/app/components/content.components/imageGallery";
export default function DesignGallery() {
  return (
    <main>
      <Card>
        <Card.Header>Design Gallery</Card.Header>
        <Card.Description>
          Have a look through all of my different frontend designs throughout
          the years.
        </Card.Description>

        <Card.Content>
          {/* TODO: make api for google disk or add all the photos locally? */}
          <ImageGallery assets={[]} />
        </Card.Content>
      </Card>
    </main>
  );
}

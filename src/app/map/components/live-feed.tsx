import { useEffect, useRef } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import notifications from "../mockdata.json";

interface LiveFeedProps {
  selectedNotification: number | null;
}

export function LiveFeed({ selectedNotification }: LiveFeedProps) {
  const t = useTranslations("map");
  const notificationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (selectedNotification !== null) {
      notificationRefs.current[selectedNotification]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedNotification]);

  return (
    <Card className="basis-1/3 flex flex-col overflow-hidden">
      <CardTitle className="font-medium p-2">{t("feed")}</CardTitle>
      <ScrollArea className="flex-1">
        <CardContent className="px-0">
          {notifications.map((notification, index) => (
            <>
              <div
                key={index}
                ref={(el) => {
                  notificationRefs.current[index] = el;
                }}
                className={`flex w-full flex-col px-4 ${selectedNotification === index ? "border-l-2 border-l-destructive" : ""}`}
              >
                <div className="p-2">
                  <div className="flex flex-row justify-between items-center">
                    <Button
                      size="icon"
                      variant="outline"
                      disabled
                      className="rounded-full"
                    >
                      <Siren className="w-4 h-4 text-primary" />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground font-normal">
                      {notification.description}
                    </p>
                  </div>

                  <Carousel className="w-full">
                    <CarouselContent className="-ml-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem
                          key={index}
                          className="pl-1 md:basis-1/2 basis-1/4"
                        >
                          <Card>
                            <CardContent className="flex basis-1/2 aspect-square items-center justify-center p-1">
                              <span className="text-xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </div>
              <Separator className="w-full" />
            </>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
}

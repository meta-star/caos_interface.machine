TARGET_DIRECTORY := $(shell pwd)

target: clean
	cp -r $(TARGET_DIRECTORY)/call $(TARGET_DIRECTORY)/dist
	cd $(TARGET_DIRECTORY)/view && npm install && npm run build
	cd $(TARGET_DIRECTORY)/dist && mv ../view/dist ./web && npm install

view-dev:
	cd $(TARGET_DIRECTORY)/view && npm install && CAOS_DEV=1 npm run dev

call-dev:
	cd $(TARGET_DIRECTORY)/call && npm install && CAOS_DEV=1 npm run dev

clean:
	rm -rf $(TARGET_DIRECTORY)/dist

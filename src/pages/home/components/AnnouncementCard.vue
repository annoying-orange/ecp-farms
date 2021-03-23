<template>
    <q-card flat class="shadow-8 radius-30">
        <q-card-section>
            <div class="text-h5 text-weight-bold">Announcements</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <q-scroll-area style="height: 200px;">
            <q-list padding>
            <q-item>
            <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>

            <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="facebook" color="yellow" />
            </q-item-section>
            </q-item>

            <q-separator spaced inset="item" />

            <q-item>
            <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>

            <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-item-label caption>7h ago</q-item-label>
                <q-icon name="facebook" color="yellow" />
            </q-item-section>
            </q-item>
            <q-separator spaced inset="item" />

            <q-item>
            <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>

            <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-item-label caption>7h ago</q-item-label>
                <q-icon name="facebook" color="yellow" />
            </q-item-section>
            </q-item>
            <q-separator spaced inset="item" />

            <q-item>
            <q-item-section top avatar>
                <q-avatar color="primary" text-color="white" icon="bluetooth" />
            </q-item-section>

            <q-item-section>
                <q-item-label>Single line item</q-item-label>
                <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
            </q-item-section>

            <q-item-section side top>
                <q-item-label caption>7h ago</q-item-label>
                <q-icon name="facebook" color="yellow" />
            </q-item-section>
            </q-item>
            </q-list>
            </q-scroll-area>
        </q-card-section>
    </q-card>
</template>
<script>
export default {
  name: 'Announcement'
}
</script>
